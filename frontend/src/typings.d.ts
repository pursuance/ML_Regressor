interface CSVData {
  name: string
  data: string[][]
  features: string[]
  selectionComplete: boolean
}

interface RawCSVFile {
  data: [];
  errors: [];
   meta: {
    delimiter: string
    linebreak: string
    aborted: boolean
    truncated: boolean
    cursor: number
  };
}

type PartialSelectionState = Partial<SelectionsState>