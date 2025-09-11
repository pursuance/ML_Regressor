import { create } from 'zustand'

interface FinalParametersState {
  final_w: number[];
  final_b: number | null;
  setFinalParameters: (finalW: number[], finalB: number | null) => void;
}

export const useFinalParametersStore = create<FinalParametersState>((set) => ({
  final_w: [],
  final_b: null,
  setFinalParameters: (finalW, finalB) =>
    set(() => ({
      final_w: finalW,
      final_b: finalB,
    }))
}))