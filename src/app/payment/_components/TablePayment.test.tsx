import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import TablePayment from "./TablePayment";
import { usePaymentList, usePaymentStatus, usePaymentType } from "@/hooks/usePayment";
import { useMerchantDetail, useMerchantList } from "@/hooks/useMerchant";
import {
  mockMerchantDetail,
  mockMerchantList,
  mockPaymentList,
  mockPaymentStatus,
  mockPaymentType,
} from "@/tests/mock-data";
import type { IMerchantDetailType } from "@/types/merchant.type";

jest.mock("@/hooks/usePayment", () => ({
  usePaymentList: jest.fn(),
  usePaymentType: jest.fn(),
  usePaymentStatus: jest.fn(),
}));

jest.mock("@/hooks/useMerchant", () => ({
  useMerchantList: jest.fn(),
  useMerchantDetail: jest.fn(),
}));

jest.mock("@/hooks/useFilterAddAll", () => ({
  useFilterAddAll: jest.fn((data, mapper) => (data ? [{ value: "all", label: "전체" }, ...data.map(mapper)] : [])),
}));

describe("거래내역 테이블 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePaymentList as jest.Mock).mockReturnValue({ data: mockPaymentList });
    (usePaymentType as jest.Mock).mockReturnValue({ data: mockPaymentType });
    (usePaymentStatus as jest.Mock).mockReturnValue({ data: mockPaymentStatus });
    (useMerchantList as jest.Mock).mockReturnValue({ data: mockMerchantList });
    (useMerchantDetail as jest.Mock).mockReturnValue({ data: mockMerchantDetail });
  });

  it("거래내역 데이터가 없다면 null을 반환한다.", () => {
    (usePaymentList as jest.Mock).mockReturnValue({ data: null });

    const { container } = render(<TablePayment />);
    expect(container.firstChild).toBeNull();
  });

  it("데이터가 있을 때 제목과 총 데이터 건수를 렌더링한다.", () => {
    render(<TablePayment />);

    expect(screen.getByText("전체 거래내역")).toBeInTheDocument();
    expect(screen.getByText(`총 ${mockPaymentList.data.length}건`)).toBeInTheDocument();
    screen.debug();
  });

  it("테이블 헤더 제목이 올바르게 렌더링되어야한다.", () => {
    render(<TablePayment />);

    expect(screen.getByRole("columnheader", { name: "상태" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "결제수단" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "가맹점명" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "결제금액" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "결제일자" })).toBeInTheDocument();
  });

  describe("데이터 표시", () => {
    it("거래내역 목록 데이터가 테이블에 올바르게 렌더링되어야한다.", () => {
      render(<TablePayment />);

      mockMerchantList.data.forEach((item) => {
        expect(screen.getByText(item.mchtName)).toBeInTheDocument();
      });

      mockPaymentList.data.forEach((item) => {
        const payTypeName = mockPaymentType.data.find((v) => item.payType === v.type);
        const payStatusName = mockPaymentStatus.data.find((v) => item.status === v.code);

        expect(screen.getByText(payTypeName?.description as string)).toBeInTheDocument();
        expect(screen.getByText(`${Number(item.amount).toLocaleString()}원`)).toBeInTheDocument();
        expect(screen.getByText(payStatusName?.description as string)).toBeInTheDocument();
      });
    });

    it("가맹점 코드와 이름이 매칭이 되지않으면 '알수없는 가맹점'으로 랜더링되어야한다.", () => {
      const noMerchantName = {
        data: [
          {
            ...mockPaymentList.data[0],
            mchtCode: "no-code",
          },
        ],
      };

      (usePaymentList as jest.Mock).mockReturnValue({ data: noMerchantName });

      render(<TablePayment />);
      expect(screen.getByText("알수없는 가맹점")).toBeInTheDocument();
    });
  });

  describe("테이블 체크박스", () => {
    it("전체 선택 체크박스가 렌더링된다.", () => {
      render(<TablePayment />);

      expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    });

    it("전체 선택 체크박스를 클릭하면 모든 행이 선택된다.", () => {
      render(<TablePayment />);

      fireEvent.click(screen.getByLabelText("Select all"));

      const allCheckbox = screen.getAllByRole("checkbox");
      allCheckbox.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  describe("테이블 가맹점 상세 모달", () => {
    beforeEach(() => {
      render(<TablePayment />);

      const mchtName = screen.getByText(mockMerchantList.data[0].mchtName);
      fireEvent.click(mchtName);
    });

    it("가맹점명 클릭 시 가맹점 상세 정보 모달이 열린 상태여야한다.", () => {
      expect(screen.getByRole("dialog")).toHaveAttribute("data-state", "open");
    });

    it("해당 가맹점 모달에 상세 정보 데이터가 올바르게 랜더링되어야한다.", () => {
      const modal = screen.getByRole("dialog");
      const mchtDetailData = mockMerchantDetail.data.find(
        (v) => mockMerchantList.data[0].mchtCode === v.mchtCode
      ) as IMerchantDetailType;

      expect(screen.getByText("가맹점 상세 정보"));
      expect(within(modal).getByText(mchtDetailData.mchtName)).toBeInTheDocument();
      expect(within(modal).getByText(mchtDetailData.bizType)).toBeInTheDocument();
      expect(within(modal).getByText(mchtDetailData.address)).toBeInTheDocument();
      expect(within(modal).getByText(mchtDetailData.email)).toBeInTheDocument();
      expect(within(modal).getByText(mchtDetailData.phone)).toBeInTheDocument();
    });
  });
});
