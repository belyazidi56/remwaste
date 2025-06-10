import { create } from 'zustand';
import { SelectedSkip } from '../types/skip';

interface SkipStore {
  selectedSkip: SelectedSkip | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  selectSkip: (skip: SelectedSkip) => void;
  clearSelection: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSkipStore = create<SkipStore>((set) => ({
  selectedSkip: null,
  isLoading: false,
  error: null,
  
  selectSkip: (skip) => set({ selectedSkip: skip }),
  clearSelection: () => set({ selectedSkip: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));