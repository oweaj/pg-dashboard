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
        header: "가맹분류",
        enableColumnFilter: true,
        cell: ({ row }) => {
          return <span>{row.original.bizType}</span>;
        },
      },
      {
        id: "registeredAt",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            등록일자
            <TableSortButton column={column} />
          </div>
        ),
        accessorFn: (row) => {
          const mchtDetail = merchantDetail?.data.find((mcht) => mcht.mchtCode === row.mchtCode);
          return mchtDetail?.registeredAt;
        },
        cell: ({ getValue }) => {
          const mchtRegisterDate = getValue<string>();
          const formatDate = dateFormat(mchtRegisterDate, { day: false });
          return <span>{formatDate}</span>;
        },
        enableSorting: true,
      },
    ],
    [merchantList, merchantDetail]
  );

  const onlyMerchantType = [...new Set(merchantList?.data.map((mcht) => mcht.bizType))];
  const merchantStatusAll = useFilterAddAll(merchantStatus?.data, (data) => ({
    value: data.code,
    label: data.description,
  }));
  const merchantTypeAll = useFilterAddAll(onlyMerchantType, (data) => ({ value: data, label: data }));

  if (!merchantList || !merchantDetail || !merchantStatus) return null;

  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-end gap-3 text-xl font-semibold mb-4">
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
