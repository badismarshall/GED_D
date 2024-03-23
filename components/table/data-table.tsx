import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    VisibilityState,
    getFacetedUniqueValues,
    getFacetedRowModel,
    getSortedRowModel,
  } from "@tanstack/react-table"
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: any
    PaginationChange: any
    pages?: number
  }
  import * as React from "react"
  import { Button } from "@/components/ui/button"

  import { DataTableToolbar } from "@/components/table/components/data-table-toolbar"

  
  
  export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    PaginationChange,
    pages,
  }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})    
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
      data : data ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        columnFilters,
        pagination,
        sorting,
        columnVisibility,
        rowSelection,
      },
      onPaginationChange: PaginationChange,
      manualPagination: true,
      pageCount: pages,
      debugTable: true,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnVisibilityChange: setColumnVisibility,
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFacetedRowModel: getFacetedRowModel(),
      getSortedRowModel: getSortedRowModel(),
    })
    return (
      <div className="w-full space-y-2">
         <div className="flex items-center pt-4">
          <DataTableToolbar table={table} />
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            className="whitespace-nowrap border-0"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            className="whitespace-nowrap border-0"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    )
  }
  