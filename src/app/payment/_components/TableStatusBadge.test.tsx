import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableStatusBadge from "./TableStatusBadge";

describe("테이블 데이터 상태 별 뱃지 컴포넌트", () => {
  it('알 수 없는 상태일 때 "알수없음" 텍스트와 기본 아이콘을 렌더링한다.', () => {
    render(<TableStatusBadge status="no-status" />);

    expect(screen.getByText("알수없음")).toBeInTheDocument();
    expect(screen.getByTestId("default-state-icon")).toBeInTheDocument();
  });

  describe("SUCCESS, ACTIVE 상태", () => {
    it('SUCCESS 상태일 때 "결제완료" 텍스트와 체크 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="SUCCESS" />);

      expect(screen.getByText("결제완료")).toBeInTheDocument();
      expect(screen.getByTestId("check-state-icon")).toBeInTheDocument();
    });

    it('ACTIVE 상태일 때 "활성" 텍스트와 체크 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="ACTIVE" />);

      expect(screen.getByText("활성")).toBeInTheDocument();
      expect(screen.getByTestId("check-state-icon")).toBeInTheDocument();
    });
  });

  describe("FAILED, CLOSED 상태", () => {
    it('FAILED 상태일 때 "결제실패" 텍스트와 x 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="FAILED" />);

      expect(screen.getByText("결제실패")).toBeInTheDocument();
      expect(screen.getByTestId("reject-state-icon")).toBeInTheDocument();
    });

    it('CLOSED 상태일 때 "폐기" 텍스트와 x 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="CLOSED" />);

      expect(screen.getByText("폐기")).toBeInTheDocument();
      expect(screen.getByTestId("reject-state-icon")).toBeInTheDocument();
    });
  });

  describe("CANCELLED, INACTIVE 상태", () => {
    it('CANCELLED 상태일 때 "환불완료" 텍스트와 경고 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="CANCELLED" />);

      expect(screen.getByText("환불완료")).toBeInTheDocument();
      expect(screen.getByTestId("warn-state-icon")).toBeInTheDocument();
    });

    it('INACTIVE 상태일 때 "중지" 텍스트와 경고 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="INACTIVE" />);

      expect(screen.getByText("중지")).toBeInTheDocument();
      expect(screen.getByTestId("warn-state-icon")).toBeInTheDocument();
    });
  });

  describe("PENDING, READY 상태", () => {
    it('PENDING 상태일 때 "결제대기" 텍스트와 로딩 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="PENDING" />);

      expect(screen.getByText("결제대기")).toBeInTheDocument();
      expect(screen.getByTestId("wait-state-icon")).toBeInTheDocument();
    });

    it('READY 상태일 때 "대기" 텍스트와 로딩 아이콘을 렌더링한다.', () => {
      render(<TableStatusBadge status="READY" />);

      expect(screen.getByText("대기")).toBeInTheDocument();
      expect(screen.getByTestId("wait-state-icon")).toBeInTheDocument();
    });
  });
});
