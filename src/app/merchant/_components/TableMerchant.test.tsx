import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useMerchantDetail, useMerchantList, useMerchantStatus } from "@/hooks/useMerchant";
import { mockMerchantDetail, mockMerchantList, mockMerchantStatus } from "@/tests/mock-data";
import type { IMerchantDetailType } from "@/types/merchant.type";
import TableMerchant from "./TableMerchant";

jest.mock("@/hooks/useMerchant", () => ({
  useMerchantList: jest.fn(),
  useMerchantDetail: jest.fn(),
  useMerchantStatus: jest.fn(),
}));

describe("가맹점 목록 테이블 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useMerchantList as jest.Mock).mockReturnValue({ data: mockMerchantList });
    (useMerchantDetail as jest.Mock).mockReturnValue({ data: mockMerchantDetail });
    (useMerchantStatus as jest.Mock).mockReturnValue({ data: mockMerchantStatus });
  });

  it("가맹점 목록 데이터가 없다면 null을 반환한다.", () => {
    (useMerchantList as jest.Mock).mockReturnValue({ data: null });

    const { container } = render(<TableMerchant />);
    expect(container.firstChild).toBeNull();
  });

  it("데이터가 있을 때 제목과 총 데이터 건수를 렌더링한다.", () => {
    render(<TableMerchant />);

    expect(screen.getByText("전체 가맹점 목록")).toBeInTheDocument();
    expect(screen.getByText(`총 ${mockMerchantList.data.length}개`)).toBeInTheDocument();
    screen.debug();
  });

  it("테이블 헤더 제목이 올바르게 렌더링되어야한다.", () => {
    render(<TableMerchant />);

    expect(screen.getByRole("columnheader", { name: "상태" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "가맹점명" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "유형" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "등록일자" })).toBeInTheDocument();
  });

  it("가맹점 목록 데이터가 테이블에 올바르게 렌더링되어야한다.", () => {
    render(<TableMerchant />);

    mockMerchantList.data.forEach((item) => {
      expect(screen.getByText(item.mchtName)).toBeInTheDocument();
    });

    mockMerchantList.data.forEach((item) => {
      const mchtStatusName = mockMerchantStatus.data.find((v) => item.status === v.code);

      expect(screen.getByText(mchtStatusName?.description as string)).toBeInTheDocument();
      expect(screen.getByText(item.mchtName)).toBeInTheDocument();
      expect(screen.getByText(item.bizType)).toBeInTheDocument();
    });
  });

  describe("테이블 체크박스", () => {
    it("전체 선택 체크박스가 렌더링된다.", () => {
      render(<TableMerchant />);

      expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    });

    it("전체 선택 체크박스를 클릭하면 모든 행이 선택된다.", () => {
      render(<TableMerchant />);

      fireEvent.click(screen.getByLabelText("Select all"));

      const allCheckbox = screen.getAllByRole("checkbox");
      allCheckbox.forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  describe("테이블 가맹점 상세 모달", () => {
    beforeEach(() => {
      render(<TableMerchant />);

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
