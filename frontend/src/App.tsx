import ChartComponent from "./components/ChartComponent"
import ColumnSelectionComponent from "./components/ColumnSelectionComponent"
import DataSelectionComponent from "./components/DataSelectionComponent"
import { useDataStore } from "./store"
import CSVReader from "@/components/CSVReader"
import CSV_Viewer from "./components/CSV_Viewer"
import { useEffect } from "react"

function App() {

  const { data, setData } = useDataStore()

  useEffect(() => {
    if (!data) {
      const newData = localStorage.getItem('data')
      newData && setData(JSON.parse(newData))
    }
  }, [])

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
