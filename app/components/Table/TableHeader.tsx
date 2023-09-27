import { Group, TextInput, IconSearch } from "@pokt-foundation/pocket-blocks"
import { IdObj, TableHeaderProps } from "~/types/table"

export const TableHeader = <T extends IdObj>({
  label,
  search,
  columns,
  setSearchTerm,
  rightComponent,
}: TableHeaderProps<T>) => {
  return (
    <Group align="center" className="pokt-table-header" position="apart">
      {label && <h3>{label}</h3>}
      {search && (
        <TextInput
          aria-label={`Search by ${columns.join(", ")}`}
          className="pokt-table-search"
          icon={<IconSearch fill="white" height={12} width={12} />}
          name="search"
          placeholder={`Search by ${columns.join(", ")}`}
          rightSectionWidth={85}
          size="xs"
          variant="default"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      {rightComponent && rightComponent}
    </Group>
  )
}
