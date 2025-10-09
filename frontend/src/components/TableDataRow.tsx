import { memo } from "react"
import { TableCell, TableRow } from '@/components/ui/table'

const TableDataRow = memo(({ dataArray, index}: { dataArray: string[], index: number}) => {
  return (
    <TableRow key={index}>
      {dataArray.map((cell, cellIndex) =>
        <TableCell key={cellIndex}>{cell}</TableCell>
      )}
    </TableRow>
  )
})

export default TableDataRow