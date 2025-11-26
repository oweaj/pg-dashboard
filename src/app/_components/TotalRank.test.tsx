import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TotalRank from "./TotalRank";
import { useMerchantList } from "@/hooks/useMerchant";
import { mockPaymentList, mockMerchantList } from "@/tests/mock-data";

jest.mock("@/hooks/useMerchant", () => ({
  useMerchantList: jest.fn(),
}));

describe("대시보드 거래금액 랭킹 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMerchantList as jest.Mock).mockReturnValue({ data: mockMerchantList });
  });

  it("컴포넌트가 정상적으로 렌더링되어야한다.", () => {
    render(<TotalRank data={mockPaymentList.data} />);

    expect(screen.getByText("거래별 금액 TOP5")).toBeInTheDocument();
    expect(screen.getByText("※ 단순 거래별 금액 순위입니다")).toBeInTheDocument();

    mockMerchantList.data.forEach((item) => {
      expect(screen.getByText(item.mchtName)).toBeInTheDocument();
    });
  });

  it("거래금액이 높은 순서대로 TOP5를 표시한다.", () => {
    render(<TotalRank data={mockPaymentList.data} />);

    const totalList = screen.getAllByText(/원$/).map((v) => v.textContent);
    expect(totalList).toHaveLength(mockPaymentList.data.length);

    const totalSort = [...mockPaymentList.data]
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .map((v) => `${Number(v.amount).toLocaleString()}원`);

    expect(totalList).toEqual(totalSort);
  });
});
