import { Table, Box, LoadingOverlay } from "@mantine/core"
import cx from "clsx"
import React from "react"
import classes from "./DataTable.module.css"
import { DataTableBody } from "./DataTableBody"
import { DataTablePagination } from "./DataTablePagination"
import { usePagination } from "~/hooks/usePagination"
import { DataTableProps, IdObj } from "~/types/table"

export const DataTable = <T extends IdObj>({
  data,
  columns,
  paginate,
  rowAsLink = false,
  searchTerm,
  onRowClick,
  isLoading = false,
}: DataTableProps<T>) => {
  const { paginatedData, totalPages, page, handlePageChange } = usePagination({
    data,
    paginate,
    searchTerm,
  })

  return (
    <Box pos="relative">
      <LoadingOverlay overlayProps={{ blur: 1 }} visible={isLoading} />
      <Table
        className={cx(classes.table, { "clickable-table": !!onRowClick })}
        highlightOnHover={!!onRowClick}
        verticalSpacing="lg"
      >
        {columns && (
          <Table.Thead>
            <Table.Tr>
              {columns.map((key) => (
                <Table.Th key={key as string}>{key as string}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
        )}

        <DataTableBody
          data={data}
          paginatedData={paginatedData}
          rowAsLink={rowAsLink}
          onRowClick={onRowClick}
        />
      </Table>

      {paginate && (
        <DataTablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Box>
  )
}

export default DataTable
