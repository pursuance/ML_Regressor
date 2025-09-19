import ChartComponent from "./components/ChartComponent"
import ColumnSelectionComponent from "./components/ColumnSelectionComponent"
import DataSelectionComponent from "./components/DataSelectionComponent"
import { useDataStore } from "./store"
import CSVReader from "@/components/CSVReader"

function App() {

  const { data } = useDataStore()

  return (
    <div className="border-1 m-8 rounded-md">
     <CSVReader /> 
    </div>
  )
}

export default App
