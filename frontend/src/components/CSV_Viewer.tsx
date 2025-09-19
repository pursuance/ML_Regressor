import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDataStore } from "@/store"

const CSV_Viewer = () => {
  const { data } = useDataStore()

  const TableHeads = data![0].map((header, index) => 
    <TableHead key={index}>{header}</TableHead>
  )

  const TableRows = data!.slice(1).map((dataArray, index) =>
    <TableRow key={index}>
      {dataArray.map((data, index) =>
        <TableCell key={index}>{data}</TableCell>
      )}
    </TableRow>
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TableHeads}
        </TableRow>
      </TableHeader>
      <TableBody>
        {TableRows}
      </TableBody>
    </Table>
  )
}

export default CSV_Viewer