import { create } from 'zustand'

interface FinalParametersState {
  final_w: number[];
  final_b: number | null;
  J_history: number[];
  num_iterations: number;
  setFinalParameters: (finalW: number[], finalB: number | null, num_iterations: number, J_history: number[]) => void;
}

export const useFinalParametersStore = create<FinalParametersState>((set) => ({
  final_w: [],
  final_b: null,
  J_history: [],
  num_iterations: 1000,
  setFinalParameters: (finalW, finalB, num_iterations, J_history) =>
    set(() => ({
      final_w: finalW,
      final_b: finalB,
      num_iterations,
      J_history,
    }))
}))

interface DataState {
  data: CSVData | null;
  setData: (data: CSVData) => void;
}

export const useDataStore = create<DataState>((set) => ({
  data: null,
  setData: (newData: CSVData) => 
    set(() => ({
      data: newData
    }))
}))