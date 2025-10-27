import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDataStore } from "@/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import TableHeadWithButtons from "./TableHeadWithButtons"
import TableDataRow from "./TableDataRow"

const CSV_Viewer = () => {
  const { data } = useDataStore()

  const tableHeaders = data?.[0] || []

  const tableRows = data?.slice(1) || []

  return (
    <div className="flex flex-col justify-center items-center h-2/3">
      <ScrollArea className="h-128 w-2/3 rounded-md border overflow-y-auto">
          <Table isScrollable>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHeadWithButtons key={header} header={header} />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((dataArray, index) =>
                <TableDataRow dataArray={dataArray} index={index} key={index} />
              )}
            </TableBody>
          </Table>
      </ScrollArea>
    </div>
  )
}

export default CSV_Viewer