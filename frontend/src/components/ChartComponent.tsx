import { Suspense } from "react"
import Chart from "@/components/chart"
import { useFinalParametersStore } from "@/store"
 

const ChartComponent = () => {

  const { J_history } = useFinalParametersStore()

  return (
    <>
      <div className="flex flex-row">
          <Suspense fallback={<p>Loading...</p>}>
            {J_history.length > 0 && <Chart />}
          </Suspense>
      </div>
    </>
  )
}

export default ChartComponent