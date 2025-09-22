import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDataStore } from "@/store"
import { ScrollArea } from "@/components/ui/scroll-area"

const CSV_Viewer = () => {
  const { data } = useDataStore()

  const TableHeads = data![0].map((header, index) => 
    <TableHead className="font-bold" key={index}>{header}</TableHead>
  )

  const TableRows = data!.slice(1).map((dataArray, index) =>
    <TableRow key={index}>
      {dataArray.map((data, index) =>
        <TableCell key={index}>{data}</TableCell>
      )}
    </TableRow>
  )

  return (
    <div className="flex justify-center items-center h-2/3">
      <ScrollArea className="h-128 w-2/3 rounded-md border">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                {TableHeads}
              </TableRow>
            </TableHeader>
            <TableBody>
              {TableRows}
            </TableBody>
          </Table>
      </ScrollArea>
    </div>
  )
}

export default CSV_Viewer