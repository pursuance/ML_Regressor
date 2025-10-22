import { useFinalParametersStore, useSelectionsStore } from "@/store"
import TeX from '@matejmazur/react-katex'
import 'katex/dist/katex.min.css'


const FinalParams = () => {

  const { final_w, final_b, J_history } = useFinalParametersStore()
  const { features } = useSelectionsStore()

  const final_model = `y = ${final_w.map((w,index) => `${w} x${index} `)} + ${final_b}`

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Final Weights:</h4>
        {final_w &&
          final_w.map((w, index) => (
            <p key={index}>
              w{index} ({features[index]}): {w.toFixed(4)}
            </p>
          ))}
      </div>
      <div>
        <h4 className="font-semibold mb-2">Final Bias:</h4>
        {final_b && <p>b: {final_b.toFixed(4)}</p>}
      </div>
      <TeX>
        {final_model}
      </TeX>
    </div>
  )
}

export default FinalParams