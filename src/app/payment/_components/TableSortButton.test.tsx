import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TableSortButton from "./TableSortButton";

describe("테이블 데이터 정렬 버튼 컴포넌트", () => {
  const mockToggleSort = jest.fn();
  const mockClearSort = jest.fn();
  const mockGetSort = jest.fn();

  const mockColumn = {
    toggleSorting: mockToggleSort,
    clearSorting: mockClearSort,
    getIsSorted: mockGetSort,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정렬되지 않은 상태에서 기본 정렬 아이콘이 표시된다.", () => {
    mockGetSort.mockReturnValue(false);
    render(<TableSortButton column={mockColumn as any} />);

    expect(screen.getByTestId("default-sort-icon")).toBeInTheDocument();
  });

  it("정렬되지 않은 기본 상태에서 클릭하면 오름차순 정렬을 호출한다.", () => {
    mockGetSort.mockReturnValue(false);
    render(<TableSortButton column={mockColumn as any} />);

    fireEvent.click(screen.getByTestId("default-sort-icon"));

    expect(mockToggleSort).toHaveBeenCalledWith(false);
    expect(mockToggleSort).toHaveBeenCalledTimes(1);
  });

  it("오름차순 상태에서 클릭하면 내림차순 정렬을 호출한다.", () => {
    mockGetSort.mockReturnValue("asc");
    render(<TableSortButton column={mockColumn as any} />);

    fireEvent.click(screen.getByTestId("asc-sort-icon"));

    expect(mockToggleSort).toHaveBeenCalledWith(true);
    expect(mockToggleSort).toHaveBeenCalledTimes(1);
  });

  it("내림차순 상태에서 클릭하면 해당 정렬을 초기화 시킨다.", () => {
    mockGetSort.mockReturnValue("desc");
    render(<TableSortButton column={mockColumn as any} />);

    fireEvent.click(screen.getByTestId("desc-sort-icon"));

    expect(mockClearSort).toHaveBeenCalledTimes(1);
  });
});
