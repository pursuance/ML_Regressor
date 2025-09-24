import { useDataStore } from "./store"
import CSVReader from "@/components/CSVReader"
import { useEffect } from "react"
import DataSelected from "./components/DataSelected"

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
        <DataSelected />
      }
    </>
  )
}

export default App
