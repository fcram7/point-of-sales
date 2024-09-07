import { create } from 'zustand';

interface itemCategory {
  itemCategory: string;
}

interface itemCategoryAction {
  setItemCategory: (category: itemCategory['itemCategory']) => void;
}

export const categoryStore = create<itemCategory & itemCategoryAction>((set) => ({
  itemCategory: 'drinks',
  setItemCategory: (itemCategory) => set({ itemCategory: itemCategory })
}))