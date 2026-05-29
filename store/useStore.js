import create from 'zustand';

export const useStore = create((set) => ({
  searchQuery: '',
  premiumActive: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  enablePremium: () => set({ premiumActive: true }),
}));
