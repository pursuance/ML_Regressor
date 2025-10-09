import { memo } from 'react'
import { TableHead } from '@/components/ui/table'
import FeatureAndLabelButtons from './FeatureAndLabelButtons'

const TableHeadWithButtons = memo(({ header }: { header: string}) => {
  return (
    <TableHead className ='font-bold'>
      <div>
        {header}
        <FeatureAndLabelButtons col={header} />
      </div>
    </TableHead>
  )
})

export default TableHeadWithButtons