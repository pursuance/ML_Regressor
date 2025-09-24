import { useSelectionsState } from "../store"

const SelectionsDisplay = () => {
  const { features, label } = useSelectionsState()

  const listFeatures = (features: string[]) => {
    if (features.length > 1) {
      return features.join(', ')
    } else return features[0]
  }

  if (features || label){
    return (
      <div>
        <p>
          Features: {listFeatures(features)}
        </p>
        <p>Label: {label}</p>
      </div>
    )
  } else return null
}

export default SelectionsDisplay