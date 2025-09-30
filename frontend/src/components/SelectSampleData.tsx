"use client"

import sample_data from "@/sample_data.json"
import { Button } from "./ui/button"
import { useDataStore } from "@/store"

const SelectSampleData = () => {
  const SampleDataCard = ({ data }: { data: CSVData }) => {
    const name = data.name.replace(/_/g, " ").replace(".csv", "")

    const { setData } = useDataStore()

    const onClick = () => {
      setData(data.data)
      localStorage.setItem('data', JSON.stringify(data.data))
    }

    return (
      <Button variant="ghost" onClick={onClick} className="cursor-pointer">
        <div className="flex flex-col items-center gap-2 w-32 h-32 text-center p-4 border rounded-lg hover:bg-accent">
          <div className="text-2xl">📊</div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </Button>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {sample_data.map((data, index) => (
        <SampleDataCard data={{ ...data, features: [], selectionComplete: false }} key={index} />
      ))}
    </div>
  )
}

export default SelectSampleData
