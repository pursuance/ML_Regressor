import { useFinalParametersStore, useSelectionsStore } from "@/store"


const FinalParams = () => {

  const { final_w, final_b, J_history } = useFinalParametersStore()
  const { features } = useSelectionsStore()

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
    </div>
  )
}

export default FinalParams