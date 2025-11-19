"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconLoader,
  IconPlus,
  IconCircleXFilled,
  IconExclamationCircleFilled,
  IconArrowsSort,
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconSearch,
} from "@tabler/icons-react";
import {
  type Column,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { IPaymentType } from "@/types/payment.type";
import { dateFormat } from "@/utils/dateFormet";
import { usePaymentStatus, usePaymentType } from "@/hooks/usePayment";
import { useMerchantList } from "@/hooks/useMerchant";
import FilterSelect from "./data-select";
import { Input } from "./ui/input";

export function DataTable({ data }: { data: IPaymentType[] }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const tableTopRef = React.useRef<HTMLDivElement>(null);
  const { data: paymentType } = usePaymentType();
  const { data: paymentStatus } = usePaymentStatus();
  const { data: merchantList } = useMerchantList();

  // 테이블 데이터 열
  const columns = React.useMemo<ColumnDef<IPaymentType>[]>(() => {
    if (!merchantList || !paymentType) return [];

    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox checked={row.getIsSelected()} onCheckedChange={(val) => row.toggleSelected(!!val)} />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "상태",
        enableColumnFilter: true,
        cell: ({ row }) => {
          const statusMap: Record<string, { icon: React.JSX.Element; description: string }> = {
            SUCCESS: {
              icon: <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />,
              description: "결제완료",
            },
            FAILED: {
              icon: <IconCircleXFilled className=" fill-red-500 dark:fill-red-400" />,
              description: "결제실패",
            },
            CANCELLED: {
              icon: <IconExclamationCircleFilled className=" fill-yellow-500 dark:fill-yellow-400" />,
              description: "환불완료",
            },

            PENDING: {
              icon: <IconLoader />,
              description: "결제대기",
            },
          };

          return (
            <Badge variant="outline" className="text-muted-foreground">
              {statusMap[row.original.status].icon || <IconLoader />}
              {statusMap[row.original.status].description || "알수없음"}
            </Badge>
          );
        },
      },
      {
        id: "mchtName",
        header: "가맹점명",
        enableGlobalFilter: true,
        accessorFn: (row) => {
          const merchant = merchantList?.data.find((m) => m.mchtCode === row.mchtCode);
          return merchant?.mchtName ?? "알수없는 가맹점";
        },
        cell: ({ getValue }) => {
          return (
            <Button variant="link" className="text-foreground w-fit px-0 text-left">
              {getValue<string>()}
            </Button>
          );
        },
      },
      {
        accessorKey: "payType",
        header: "결제수단",
        enableColumnFilter: true,
        cell: ({ row }) => {
          const typeFind = paymentType?.data.find((pay) => pay.type === row.original.payType);
          return (
            <>
              <Label htmlFor={row.original.payType} className="sr-only">
                결제수단
              </Label>
              <span>{typeFind?.description}</span>
            </>
          );
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            결제금액
            <TableSortButton column={column} />
          </div>
        ),
        cell: ({ row }) => {
          const amountNumber = Number(row.original.amount);
          return (
            <>
              <Label htmlFor={row.original.amount} className="sr-only">
                결제금액
              </Label>
              <span>{amountNumber.toLocaleString()}원</span>
            </>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "paymentAt",
        header: ({ column }) => (
          <div className="flex items-center gap-1">
            결제일자
            <TableSortButton column={column} />
          </div>
        ),
        cell: ({ row }) => {
          const formatDate = dateFormat(row.original.paymentAt, { day: false });
          return (
            <>
              <Label htmlFor={row.original.paymentAt} className="sr-only">
                결제일자
              </Label>
              <span>{formatDate}</span>
            </>
          );
        },
        enableSorting: true,
      },
    ];
  }, [paymentType, merchantList]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection, columnFilters, pagination, globalFilter },
    getRowId: (row) => row.paymentCode,
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

  const paymentTypeAll = React.useMemo(
    () => [{ type: "ALL", description: "전체" }, ...(paymentType?.data ?? [])],
    [paymentType]
  );

  const paymentStatusAll = React.useMemo(
    () => [{ code: "ALL", description: "전체" }, ...(paymentStatus?.data ?? [])],
    [paymentStatus]
  );

  const handleSearch = () => {
    setGlobalFilter(searchInput);
  };

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <div ref={tableTopRef} className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex gap-2">
          <FilterSelect
            onChange={(value: string) =>
              setColumnFilters((prev) => {
                if (value === "ALL") {
                  return prev.filter((select) => select.id !== "status");
                }
                return [...prev.filter((select) => select.id !== "status"), { id: "status", value }];
              })
            }
            items={paymentStatusAll}
            placeholder="상태"
            getValue={(item) => item.code}
            getLabel={(item) => item.description}
          />
          <FilterSelect
            onChange={(value: string) =>
              setColumnFilters((prev) => {
                if (value === "ALL") {
                  return prev.filter((select) => select.id !== "payType");
                }
                return [...prev.filter((select) => select.id !== "payType"), { id: "payType", value }];
              })
            }
            items={paymentTypeAll}
            placeholder="결제수단"
            getValue={(item) => item.type}
            getLabel={(item) => item.description}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center border rounded-md px-2">
            <IconSearch className="w-4.5 h-4.5 cursor-pointer" onClick={handleSearch} />
            <Input
              type="text"
              className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="가맹점을 검색해주세요."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">거래내역 추가</span>
          </Button>
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
}

interface SortButtonProps<TData, TValue> {
  column: Column<TData, TValue>;
}

// 테이블 금액/일자 정렬
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
