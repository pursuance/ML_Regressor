import { useState } from "react"
import CSV_Viewer from "@/components/CSV_Viewer"
import ChartComponent from "@/components/ChartComponent"
import { Button } from "@/components/ui/button"
import { useDataStore } from "@/store"

const DataSelected = () => {

  const [renderState, setRenderState] = useState('View CSV')
  const { setData } = useDataStore() 

  return (
    <div>
      <Button 
        onClick={() => setRenderState('View CSV')}
      >
        View CSV
      </Button>
      <Button 
        onClick={() => setRenderState('Train Model')}
      >
        Train Model
      </Button>
      <Button 
        onClick = {() => setData(null)}
      >
        Clear Data
      </Button>
      <div>
        {renderState === 'View CSV' && <CSV_Viewer />}
        {renderState === 'Train Model' && <ChartComponent />}
      </div>
    </div>
  )
}

export default DataSelected