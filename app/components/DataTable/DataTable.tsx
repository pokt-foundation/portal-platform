import { Table, Box } from "@pokt-foundation/pocket-blocks"
import { DataTableBody } from "./DataTableBody"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableProps, IdObj } from "~/components/DataTable/dataTable.d"
import { usePagination } from "~/hooks/usePagination"

export const DataTable = <T extends IdObj>({
  data,
  columns,
  paginate,
  rowAsLink = false,
  searchTerm,
}: DataTableProps<T>) => {
  const { paginatedData, totalPages, page, handlePageChange } = usePagination({
    data,
    paginate,
    searchTerm,
  })

  return (
    <Box>
      <Table verticalSpacing="xl">
        {columns && (
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key as string}>{key as string}</th>
              ))}
            </tr>
          </thead>
        )}

        <DataTableBody data={data} paginatedData={paginatedData} rowAsLink={rowAsLink} />
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
