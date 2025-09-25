const parseColumn = (data: any[][], col: string) => {
  const colIndex = data[0].indexOf(col)

  const colData = data.slice(1).map(row => row[colIndex])  

  return colData
}

export const parseFeatures = (data: any[][], features: string[]) => {
  return features.map(feature => parseColumn(data, feature))
}

export const parseLabel = (data: any[][], label: string) => {
  return parseColumn(data, label)
}