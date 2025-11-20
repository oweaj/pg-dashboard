"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useMerchantDetail, useMerchantList, useMerchantStatus } from "@/hooks/useMerchant";
import type { ColumnDef } from "@tanstack/react-table";
import TableStatusBadge from "@/app/payment/_components/TableStatusBadge";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/utils/dateFormet";
import type { IMerchantListType } from "@/types/merchant.type";
import TableSortButton from "@/app/payment/_components/TableSortButton";
import TableModal from "@/components/modal-table";
import MerchantDetail from "@/app/_components/MerchantDetail";
import { useFilterAddAll } from "@/hooks/useFilterAddAll";

// 가맹점 리스트 컴포넌트
const TableMerchant = () => {
  const { data: merchantList } = useMerchantList();
  const { data: merchantDetail } = useMerchantDetail();
  const { data: merchantStatus } = useMerchantStatus();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState("");

  const columns = useMemo<ColumnDef<IMerchantListType>[]>(
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
        accessorKey: "bizType",
        header: "유형",
        enableColumnFilter: true,
        cell: ({ row }) => {
          return <span>{row.original.bizType}</span>;
        },
      },
      {
        id: "date",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            등록일자
            <TableSortButton column={column} />
          </div>
        ),
        accessorFn: (row) => {
          const mchtDetail = merchantDetail?.data.find((mcht) => mcht.mchtCode === row.mchtCode);
          return mchtDetail?.registeredAt ? new Date(mchtDetail.registeredAt) : undefined;
        },
        filterFn: (row, columnId, filterValue) => {
          const { start, end } = filterValue as { start: Date; end: Date };
          const rowDate = row.getValue<Date>(columnId);
          if (!rowDate) return false;

          const resetDate = new Date(rowDate.setHours(0, 0, 0, 0));
          const startDate = new Date(start.setHours(0, 0, 0, 0));
          const endDate = new Date(end.setHours(23, 59, 59, 999));

          return resetDate >= startDate && resetDate <= endDate;
        },
        cell: ({ getValue }) => {
          const mchtRegisterDate = getValue<string>();
          const formatDate = dateFormat(mchtRegisterDate, { day: false });
          return <span>{formatDate}</span>;
        },
        enableSorting: true,
        enableColumnFilter: true,
      },
    ],
    [merchantList, merchantDetail]
  );

  const merchantStatusAll = useFilterAddAll(merchantStatus?.data, (data) => ({
    value: data.code,
    label: data.description,
  }));
  const onlyMerchantType = [...new Set(merchantList?.data.map((mcht) => mcht.bizType))];
  const merchantTypeAll = useFilterAddAll(onlyMerchantType, (data) => ({ value: data, label: data }));

  if (!merchantList || !merchantDetail || !merchantStatus) return null;

  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-end gap-3 text-xl font-semibold">
        <h2>전체 가맹점 목록</h2>
        <span className="text-base text-gray-600">총 {merchantList.data.length ?? 0}개</span>
      </div>
      <DataTable
        columns={columns}
        data={merchantList.data}
        filterStatus={merchantStatusAll}
        filterType={merchantTypeAll}
        page="merchant"
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

export default TableMerchant;
