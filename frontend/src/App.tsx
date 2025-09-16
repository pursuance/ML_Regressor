import { Suspense } from "react"
import SubmissionForm from "@/components/SubmissionForm"
import Chart from "@/components/chart"
import { useFinalParametersStore } from "@/store"

function App() {

  const { final_w, final_b, J_history } = useFinalParametersStore()

  return (
    <>
      <div className="flex flex-row">
        <div className="m-10 w-1/6">
          <SubmissionForm />
        </div>
        <div className="w-1/2">
          <Suspense fallback={<p>Loading...</p>}>
            {J_history.length > 0 && <Chart />}
          </Suspense>
        </div>
      </div>
      {final_w && final_w.map((w, index) => <h1 key={index}>w{index} = {w}</h1>)}
      {final_b && <h1>b = {final_b}</h1>}
    </>
  )
}

export default App
