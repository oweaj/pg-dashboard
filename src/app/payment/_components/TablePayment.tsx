"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/data-table";
import { useMerchantDetail, useMerchantList } from "@/hooks/useMerchant";
import { usePaymentList, usePaymentStatus, usePaymentType } from "@/hooks/usePayment";
import type { IPaymentListType } from "@/types/payment.type";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { dateFormat } from "@/utils/dateFormet";
import TableSortButton from "./TableSortButton";
import TableStatusBadge from "./TableStatusBadge";
import TableModal from "@/components/modal-table";
import MerchantDetail from "@/app/_components/MerchantDetail";
import { useFilterAddAll } from "@/hooks/useFilterAddAll";

// 거래내역 리스트 컴포넌트
const TablePayment = () => {
  const { data: paymentList } = usePaymentList();
  const { data: paymentType } = usePaymentType();
  const { data: paymentStatus } = usePaymentStatus();
  const { data: merchantList } = useMerchantList();
  const { data: merchantDetail } = useMerchantDetail();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState("");

  const columns = useMemo<ColumnDef<IPaymentListType>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "상태",
        enableColumnFilter: true,
        cell: ({ row }) => <TableStatusBadge status={row.original.status} />,
      },
      {
        id: "mchtName",
        header: "가맹점명",
        enableGlobalFilter: true,
        accessorFn: (row) => {
          const merchant = merchantList?.data.find((mcht) => mcht.mchtCode === row.mchtCode);
          return merchant?.mchtName ?? "알수없는 가맹점";
        },
        cell: ({ getValue, row }) => {
          const merchantName = getValue<string>();
          return (
            <Button
              variant="link"
              className="text-foreground w-fit px-0 text-left"
              onClick={() => {
                setSelectedMerchant(row.original.mchtCode);
                setModalOpen(true);
              }}
            >
              {merchantName}
            </Button>
          );
        },
      },
      {
        accessorKey: "payType",
        header: "결제수단",
        enableColumnFilter: true,
        cell: ({ row }) => {
          const typeFind = paymentType?.data.find((pay) => pay.type === row.original.payType);
          return <span>{typeFind?.description}</span>;
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            결제금액
            <TableSortButton column={column} />
          </div>
        ),
        cell: ({ row }) => {
          const amountNumber = Number(row.original.amount);
          return <span>{amountNumber.toLocaleString()}원</span>;
        },
        enableSorting: true,
      },
      {
        id: "date",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            결제일자
            <TableSortButton column={column} />
          </div>
        ),
        accessorFn: (row) => (row.paymentAt ? new Date(row.paymentAt) : undefined),
        filterFn: (row, columnId, filterValue) => {
          const { start, end } = filterValue as { start: Date; end: Date };
          const rowDate = row.getValue<Date>(columnId);
          if (!rowDate) return false;

          const resetDate = new Date(rowDate.setHours(0, 0, 0, 0));
          const startDate = new Date(start.setHours(0, 0, 0, 0));
          const endDate = new Date(end.setHours(23, 59, 59, 999));

          return resetDate >= startDate && resetDate <= endDate;
        },
        cell: ({ row }) => {
          const formatDate = dateFormat(row.original.paymentAt, { day: false });
          return <span>{formatDate}</span>;
        },
        enableSorting: true,
        enableColumnFilter: true,
      },
    ],
    [paymentType, merchantList]
  );

  const paymentStatusAll = useFilterAddAll(paymentStatus?.data, (data) => ({
    value: data.code,
    label: data.description,
  }));
  const paymentTypeAll = useFilterAddAll(paymentType?.data, (data) => ({ value: data.type, label: data.description }));

  if (!paymentList || !paymentType || !paymentStatus || !merchantList || !merchantDetail) return null;

  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-end gap-3 text-xl font-semibold">
        <h2>전체 거래내역</h2>
        <span className="text-base text-gray-600">총 {paymentList.data.length ?? 0}건</span>
      </div>
      <DataTable
        columns={columns}
        data={paymentList.data}
        filterStatus={paymentStatusAll}
        filterType={paymentTypeAll}
        page="payment"
      />
      <TableModal
        open={modalOpen}
        size="w-2xl"
        setOpen={setModalOpen}
        title="가맹점 상세 정보"
        content={
          <MerchantDetail mchtSelect={selectedMerchant} data={merchantDetail?.data} setModalOpen={setModalOpen} />
        }
      />
    </div>
  );
};

export default TablePayment;
