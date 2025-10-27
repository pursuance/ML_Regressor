import Chart from "@/components/chart"
import { useFinalParametersStore } from "@/store"
import { Spinner } from "@/components/ui/spinner"
 

const ChartComponent = () => {

  const { J_history, isLoading } = useFinalParametersStore()

  let content

  if (isLoading) {
    content = 
    <div className="h-96 flex justify-center items-center">
      <Spinner />
    </div>
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