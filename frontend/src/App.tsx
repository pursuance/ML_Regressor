import ChartComponent from "./components/ChartComponent"
import ColumnSelectionComponent from "./components/ColumnSelectionComponent"
import DataSelectionComponent from "./components/DataSelectionComponent"
import { useDataStore } from "./store"
import CSVReader from "@/components/CSVReader"
import CSV_Viewer from "./components/CSV_Viewer"

function App() {

  const { data } = useDataStore()

  return (
    <>
    {!data ?
      <CSVReader /> 
      :
      <CSV_Viewer />
    }
    </>
  )
}

export default App
