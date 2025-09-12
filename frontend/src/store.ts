import { create } from 'zustand'

interface FinalParametersState {
  final_w: number[];
  final_b: number | null;
  J_history: number[];
  setFinalParameters: (finalW: number[], finalB: number | null, J_history: number[]) => void;
}

export const useFinalParametersStore = create<FinalParametersState>((set) => ({
  final_w: [],
  final_b: null,
  J_history: [],
  setFinalParameters: (finalW, finalB, J_history) =>
    set(() => ({
      final_w: finalW,
      final_b: finalB,
      J_history
    }))
}))