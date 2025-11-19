"use client";

import { DataTable } from "@/components/data-table";
import { usePaymentList } from "@/hooks/usePayment";

const TablePayment = () => {
  const { data } = usePaymentList();

  if (!data) return null;

  return (
    <div className="px-4 lg:px-6">
      <div className="flex items-end gap-3 text-xl font-semibold mb-4">
        <h2>전체 거래내역</h2>
        <span className="text-base text-gray-600">총 {data.data.length}건</span>
      </div>
      <DataTable data={data.data} />
    </div>
  );
};

export default TablePayment;
