import { Button } from "@/components/ui/button";
import { IconArrowNarrowDown, IconArrowNarrowUp, IconArrowsSort } from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";

interface SortButtonProps<TData, TValue> {
  column: Column<TData, TValue>;
}

// 테이블 별 정렬 토글
const TableSortButton = <TData, TValue>({ column }: SortButtonProps<TData, TValue>) => {
  const sorted = column.getIsSorted();

  const handleSort = () => {
    if (!sorted) {
      column.toggleSorting(false);
    } else if (sorted === "asc") {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  return (
    <Button variant="ghost" size="icon-sm" className="w-6 h-6 hover:border-2" onClick={handleSort}>
      {sorted === "asc" && <IconArrowNarrowUp className="w-3.5 h-3.5 text-gray-500" />}
      {sorted === "desc" && <IconArrowNarrowDown className="w-3.5 h-3.5 text-gray-500" />}
      {!sorted && <IconArrowsSort className="w-3.5 h-3.5 text-gray-500" />}
    </Button>
  );
};

export default TableSortButton;
