import SubmissionForm from "@/components/SubmissionForm"
import { useFinalParametersStore } from "@/store"

function App() {

  const { final_w, final_b } = useFinalParametersStore()

  return (
    <>
      <SubmissionForm />
      {final_w && final_w.map((w, index) => <h1 key={index}>w{index} = {w}</h1>)}
      <h1>b = {final_b}</h1>
    </>
  )
}

export default App
