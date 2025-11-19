"use client";

import { Button } from "@/components/ui/button";
import { useMerchantDetail } from "@/hooks/useMerchant";
import { dateFormat } from "@/utils/dateFormet";
import TableStatusBadge from "../payment/_components/TableStatusBadge";
import type { ReactNode } from "react";

const MerchantDetail = ({
  mchtSelect,
  setModalOpen,
}: {
  mchtSelect: string;
  setModalOpen: (modalOpen: boolean) => void;
}) => {
  const { data: merchantDetail } = useMerchantDetail();
  const mchtDetail = merchantDetail?.data.find((mcht) => mcht.mchtCode === mchtSelect);

  if (!mchtDetail) return null;

  const Field = ({ label, value }: { label: string; value: string | ReactNode }) => (
    <div className="flex">
      <div className="w-32 text-sm font-medium text-gray-600">{label}</div>
      <div className="flex-1 text-sm text-gray-900">{value}</div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="space-y-6">
        <section>
          <h3 className="mb-4 pb-2 border-b font-semibold">기본 정보</h3>
          <div className="space-y-3">
            <Field label="가맹점명" value={mchtDetail.mchtName} />
            <Field label="가맹점 코드" value={mchtDetail.mchtCode} />
            <Field label="상태" value={<TableStatusBadge status={mchtDetail.status} />} />
          </div>
        </section>
        <section>
          <h3 className="mb-4 pb-2 border-b font-semibold ">사업자 정보</h3>
          <div className="space-y-3">
            <Field label="사업자 번호" value={mchtDetail.bizNo} />
            <Field label="사업자 유형" value={mchtDetail.bizType} />
            <Field label="주소" value={mchtDetail.address} />
          </div>
        </section>
        <section>
          <div className="space-y-3">
            <h3 className="mb-4 pb-2 border-b font-semibold ">연락처</h3>
            <Field label="이메일" value={mchtDetail.email} />
            <Field label="전화번호" value={mchtDetail.phone} />
          </div>
        </section>
        <section>
          <div className="space-y-3">
            <h3 className="mb-4 pb-2 border-b font-semibold">등록 정보</h3>
            <Field label="등록일" value={dateFormat(mchtDetail.registeredAt, { time: true })} />
            <Field label="수정일" value={dateFormat(mchtDetail.updatedAt, { time: true })} />
          </div>
        </section>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 transition-colors"
          onClick={() => alert("준비중 입니다.")}
        >
          수정
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => setModalOpen(false)}>
          닫기
        </Button>
      </div>
    </div>
  );
};
export default MerchantDetail;
