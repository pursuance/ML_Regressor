import { Suspense } from "react"
import Chart from "@/components/chart"
import { useFinalParametersStore } from "@/store"
 

const ChartComponent = () => {

  const { J_history } = useFinalParametersStore()

  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/2">
          <Suspense fallback={<p>Loading...</p>}>
            {J_history.length > 0 && <Chart />}
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ChartComponent