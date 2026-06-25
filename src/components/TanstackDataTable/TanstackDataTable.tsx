import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Empty,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface TanstackDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
}

type TableRecord<TData> = TData & { __rowKey: string };

const PAGE_SIZE_OPTIONS = [5, 10, 20, 40];

export function TanstackDataTable<TData>({
  data,
  columns,
}: TanstackDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        id: false,
      },
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    defaultColumn: {
      filterFn: "includesString",
    },
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).trim().toLowerCase();
      if (!search) return true;

      return row.getVisibleCells().some((cell) => {
        if (!cell.column.getCanFilter()) return false;
        const value = cell.getValue();
        return String(value ?? "")
          .toLowerCase()
          .includes(search);
      });
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const hasFilterableColumns = table
    .getAllColumns()
    .some((column) => column.getCanFilter() && column.getIsVisible());

  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getRowCount();
  const pageCount = table.getPageCount();
  const currentPage = pageIndex + 1;

  const rows = table.getRowModel().rows;

  const rowMap = useMemo(
    () => new Map(rows.map((row) => [row.id, row])),
    [rows],
  );

  const dataSource: TableRecord<TData>[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row.original,
        __rowKey: row.id,
      })),
    [rows],
  );

  const antdColumns: ColumnsType<TableRecord<TData>> = useMemo(() => {
    const headers = table.getHeaderGroups()[0]?.headers ?? [];

    return headers
      .filter((header) => header.column.getIsVisible())
      .map((header) => {
        const column = header.column;
        const sortEntry = sorting.find((entry) => entry.id === column.id);

        return {
          key: column.id,
          title: flexRender(column.columnDef.header, header.getContext()),
          sorter: column.getCanSort() ? true : undefined,
          sortOrder: sortEntry
            ? sortEntry.desc
              ? "descend"
              : "ascend"
            : undefined,
          render: (_value: unknown, record: TableRecord<TData>) => {
            const row = rowMap.get(record.__rowKey);
            const cell = row
              ?.getVisibleCells()
              .find((c) => c.column.id === column.id);
            if (!cell) return null;
            return flexRender(cell.column.columnDef.cell, cell.getContext());
          },
        };
      });
  }, [table, sorting, rowMap]);

  const handleTableChange: TableProps<TableRecord<TData>>["onChange"] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    const activeSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    if (!activeSorter?.columnKey || !activeSorter.order) {
      setSorting([]);
      return;
    }

    setSorting([
      {
        id: String(activeSorter.columnKey),
        desc: activeSorter.order === "descend",
      },
    ]);
  };

  const getRecordsShownData = () => {
    if (total === 0) return "0 - 0 / 0";
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, total);
    return `${start} - ${end} / ${total}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {hasFilterableColumns && (
        <Input
          allowClear
          aria-label="Buscar en la tabla"
          placeholder="Buscar..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      )}

      <Table<TableRecord<TData>>
        columns={antdColumns}
        showSorterTooltip={false}
        dataSource={dataSource}
        rowKey="__rowKey"
        onChange={handleTableChange}
        pagination={false}
        locale={{ emptyText: <Empty description="Sin registros" /> }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Space>
          <Typography.Text>Registros por página:</Typography.Text>
          <Select
            aria-label="Registros por página"
            className="w-20"
            value={pageSize}
            options={PAGE_SIZE_OPTIONS.map((option) => ({
              value: option,
              label: String(option),
            }))}
            onChange={(value) => table.setPageSize(value)}
          />
          <Typography.Text type="secondary">
            {getRecordsShownData()}
          </Typography.Text>
        </Space>

        <Pagination
          size="small"
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          onChange={(page) => table.setPageIndex(page - 1)}
          showTotal={() =>
            `Página ${pageCount > 0 ? currentPage : 0} de ${pageCount}`
          }
        />
      </div>
    </div>
  );
}
