import { useDataStore } from "@/store"
import { Button } from "@/components/ui/button"

const ColumnSelectionComponent = () => {

  const { data, setData } = useDataStore()

  if (!data) return

  const Column = ({ col }: { col: string }) => {

    const onFeatureClick = () => {
      if (!data.features.includes(col)) {
        setData({ ...data, features: [...data.features, col]}) //add feature to features array
      } else {
        setData({ ...data, features: data.features.filter(feature => feature !== col) }) //remove feature from array
      }
    }

    const onLabelClick = () => {
      if (data.label !== col) {
        setData({ ...data, label: col }) //change label selection
      } else {
        setData({ ...data, label: '' }) //remove label selection
      }
    }

    return (
        <div className="border-1 p-2 rounded-md text-center font-bold">
          <div className="mb-1">{col}</div>
          <div className="flex gap-1">
            <Button 
              variant={data.features.includes(col) ? 'default' : 'outline'} 
              className='cursor-pointer' 
              onClick={onFeatureClick}
              disabled={data.label === col}
            >
              Feature
            </Button>
            <Button 
              variant={data.label?.includes(col) ? 'default' : 'outline'} 
              className="cursor-pointer" 
              onClick={onLabelClick}
            >
              Label
            </Button>
          </div>
        </div>
    )
  }

  const { cols } = data

  const Columns = cols.map((col, index) => <Column col={col} key={index} />)

  const handleSubmit = () => setData({ ...data, selectionComplete: true })

  return (
    <div className="flex flex-col items-center pb-4">
      <div className="flex flex-wrap justify-start gap-x-10 gap-y-2 px-8 py-4">
        { Columns }
      </div>
      <Button className="w-20 cursor-pointer" onClick={handleSubmit}>Submit</Button>
    </div>
    )
}

export default ColumnSelectionComponent