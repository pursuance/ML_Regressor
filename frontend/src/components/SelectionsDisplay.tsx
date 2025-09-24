import { useSelectionsStore } from "../store"

const SelectionsDisplay = () => {
  const { features, label } = useSelectionsStore()

  const listFeatures = (features: string[]) => {
    if (features.length > 1) {
      return features.join(', ')
    } else return features[0]
  }


  if (features.length > 0 || label){
    return (
      <div className="self-start">
        <p>
          Features: {listFeatures(features)}
        </p>
        <p>Label: {label}</p>
      </div>
    )
  } else return null
}

export default SelectionsDisplay