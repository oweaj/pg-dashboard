"use client";

import { useRef, useState } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus,
  IconSearch,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import FilterSelect from "./data-select";
import { Input } from "./ui/input";
import type { IOptionType } from "@/hooks/useFilterAddAll";
import { TABLE_FILTER_LABEL } from "@/constants/tableFilterLabel";
import { DataCalendar } from "./data-calendar";

interface ITableDataProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  filterStatus: IOptionType[];
  filterType: IOptionType[];
  page: keyof typeof TABLE_FILTER_LABEL;
}

const DataTable = <T,>({ columns, data, filterStatus, filterType, page }: ITableDataProps<T>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const tableTopRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, columnFilters, pagination, globalFilter },
    getRowId: (_, index) => index.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSearch = () => {
    setGlobalFilter(searchInput);
  };

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6 mt-6 lg:mt-0">
      <div ref={tableTopRef} className="flex justify-between gap-2 items-baseline-last">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-2">
            <FilterSelect
              onChange={(value: string) =>
                setColumnFilters((prev) => {
                  if (value === "ALL") {
                    return prev.filter((select) => select.id !== TABLE_FILTER_LABEL[page].status);
                  }
                  return [
                    ...prev.filter((select) => select.id !== TABLE_FILTER_LABEL[page].status),
                    { id: TABLE_FILTER_LABEL[page].status, value },
                  ];
                })
              }
              items={filterStatus}
              placeholder={TABLE_FILTER_LABEL[page].phStatus}
            />
            <FilterSelect
              onChange={(value: string) =>
                setColumnFilters((prev) => {
                  if (value === "ALL") {
                    return prev.filter((select) => select.id !== TABLE_FILTER_LABEL[page].typeId);
                  }
                  return [
                    ...prev.filter((select) => select.id !== TABLE_FILTER_LABEL[page].typeId),
                    { id: TABLE_FILTER_LABEL[page].typeId, value },
                  ];
                })
              }
              items={filterType}
              placeholder={TABLE_FILTER_LABEL[page].phType}
            />
          </div>
          <DataCalendar setColumnFilters={setColumnFilters} />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-full flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => alert("준비중 입니다.")}>
              <IconPlus />
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert("준비중 입니다.")}>
              <IconDownload />
            </Button>
            <Button variant="outline" size="sm" onClick={() => alert("준비중 입니다.")}>
              <IconTrash />
            </Button>
          </div>
          <div className="flex items-center border rounded-md px-2">
            <IconSearch className="w-4 h-4 cursor-pointer" onClick={handleSearch} />
            <Input
              type="text"
              className="w-48 h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="가맹점을 검색해주세요."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      </div>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    거래내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex w-full items-center justify-center px-4 gap-8">
          <div className="absolute left-8 flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              페이지 당 개수
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
                tableTopRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(0);
                requestAnimationFrame(() => {
                  tableTopRef.current?.scrollIntoView({ behavior: "smooth" });
                });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => {
                table.previousPage();
                tableTopRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">previous page</span>
              <IconChevronLeft />
            </Button>
            <div className="flex w-fit items-center justify-center text-sm font-medium mx-4">
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => {
                table.nextPage();
                tableTopRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                requestAnimationFrame(() => {
                  tableTopRef.current?.scrollIntoView({ behavior: "smooth" });
                });
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
};

export default DataTable;
