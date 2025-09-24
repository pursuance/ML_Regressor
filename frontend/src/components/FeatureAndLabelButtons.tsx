import { Button } from "@/components/ui/button"
import { useSelectionsStore } from "@/store"

const FeatureAndLabelButtons = ({ col }: { col: string }) => {

  const { features, label, setSelections } = useSelectionsStore()

  const onFeatureClick = () => {
    if (!features.includes(col)) {
      setSelections({ features: [...features, col] }) //add feature to features array
    } else {
      setSelections({ features: features.filter(feature => feature !== col) }) //remove feature from array
    }
  }

  const onLabelClick = () => {
    if (label !== col) {
      setSelections({ 
        label: col, //change label selection
        features: features.filter(feature => feature !== col) //remove feature selection
      }) 

    } else {
      setSelections({ label: '' }) //remove label selection
    }
  }

  return (
    <div className="flex gap-1">
       <Button 
          variant={features.includes(col) ? 'default' : 'outline'} 
          className='cursor-pointer' 
          onClick={onFeatureClick}
          disabled={label === col}
        >
          x
        </Button>
        <Button 
          variant={label?.includes(col) ? 'default' : 'outline'} 
          className="cursor-pointer" 
          onClick={onLabelClick}
        >
          y
        </Button>
    </div>
  )
}

export default FeatureAndLabelButtons