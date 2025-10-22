import Chart from "@/components/chart"
import { useFinalParametersStore } from "@/store"
 

const ChartComponent = () => {

  const { J_history, isLoading } = useFinalParametersStore()

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (J_history.length > 0) {
    content = <Chart />
  } else {
    content = 
      <div className="text-center text-muted-foreground py-12">
        Configure parameters and click "Train Model" to see results
      </div>
  }

  return (
    <>
      {content}
    </>
  )
}

export default ChartComponent