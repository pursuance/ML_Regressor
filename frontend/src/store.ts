import { create } from 'zustand'

interface SelectionsState {
  features: string[];
  label: string;
  setSelections: (updates: PartialSelectionState) => void;
}

export const useSelectionsStore = create<SelectionsState>((set) => ({
  features: [],
  label: '',
  setSelections: (updates) => 
    set((state) => ({
      ...state,
      ...updates
    })),
}))

interface FinalParametersState {
  final_w: number[];
  final_b: number | null;
  J_history: number[];
  num_iterations: number;
  isLoading: boolean;
  setIsLoading: (loadingStatus: boolean) => void;
  setFinalParameters: (finalW: number[], finalB: number | null, num_iterations: number, J_history: number[]) => void;
}

export const useFinalParametersStore = create<FinalParametersState>((set) => ({
  final_w: [],
  final_b: null,
  J_history: [],
  num_iterations: 1000,
  isLoading: false,
  setIsLoading: (loadingStatus) => set(() => ({
     isLoading: loadingStatus 
  })),
  setFinalParameters: (finalW, finalB, num_iterations, J_history) =>
    set(() => ({
      final_w: finalW,
      final_b: finalB,
      num_iterations,
      J_history,
    }))
}))

interface DataState {
  data: any[][] | null;
  setData: (data: any[][] | null) => void;
}

export const useDataStore = create<DataState>((set) => ({
  data: null,
  setData: (newData: any[][] | null) => 
    set(() => ({
      data: newData
    }))
}))