import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MerchantDetail from "./MerchantDetail";
import { mockMerchantDetail, mockMerchantStatus } from "@/tests/mock-data";
import { dateFormat } from "@/utils/dateFormet";

const mockSetModalOpen = jest.fn();

jest.mock("@/utils/dateFormet", () => ({
  dateFormat: jest.fn(),
}));

const defaultProps = {
  mchtSelect: mockMerchantDetail.data[0].mchtCode,
  data: mockMerchantDetail.data,
  setModalOpen: mockSetModalOpen,
};

describe("가맹점 상세 정보 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<MerchantDetail {...defaultProps} />);
  });

  describe("상세 기본 데이터 랜더링", () => {
    it("상세 정보 섹션 제목이 표시되어야한다.", () => {
      expect(screen.getByText("기본 정보")).toBeInTheDocument();
      expect(screen.getByText("사업자 정보")).toBeInTheDocument();
      expect(screen.getByText("연락처")).toBeInTheDocument();
      expect(screen.getByText("등록 정보")).toBeInTheDocument();
    });

    it("모든 필드 라벨이 표시되어야한다.", () => {
      expect(screen.getByText("가맹점명")).toBeInTheDocument();
      expect(screen.getByText("가맹점 코드")).toBeInTheDocument();
      expect(screen.getByText("상태")).toBeInTheDocument();
      expect(screen.getByText("사업자 번호")).toBeInTheDocument();
      expect(screen.getByText("분류")).toBeInTheDocument();
      expect(screen.getByText("주소")).toBeInTheDocument();
      expect(screen.getByText("이메일")).toBeInTheDocument();
      expect(screen.getByText("전화번호")).toBeInTheDocument();
      expect(screen.getByText("등록일")).toBeInTheDocument();
      expect(screen.getByText("수정일")).toBeInTheDocument();
    });

    it("모든 버튼이 올바르게 렌더링된다", () => {
      expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "승인" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
    });
  });

  describe("데이터 표시", () => {
    it("props에 전달된 데이터 정보에 맞게 상세 정보가 랜더링되어야한다.", () => {
      expect(screen.getByText(mockMerchantDetail.data[0].mchtName)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].mchtCode)).toBeInTheDocument();
      const checkStatus = mockMerchantStatus.data.find((item) => item.code === mockMerchantDetail.data[0].status);
      expect(screen.getByText(checkStatus?.description as string)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].bizNo)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].bizType)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].address)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].email)).toBeInTheDocument();
      expect(screen.getByText(mockMerchantDetail.data[0].phone)).toBeInTheDocument();
    });

    it("등록일과 수정일을 dateFormat 유틸 함수의 인자로 호출이 되어야한다.", () => {
      expect(dateFormat).toHaveBeenCalledWith(mockMerchantDetail.data[0].registeredAt, { time: true });
      expect(dateFormat).toHaveBeenCalledWith(mockMerchantDetail.data[0].updatedAt, { time: true });
    });
  });

  it("닫기 버튼 클릭 시 데이터 상세 정보 모달창의 상태가 false로 변경되어야한다.", () => {
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));

    expect(mockSetModalOpen).toHaveBeenCalledTimes(1);
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});
