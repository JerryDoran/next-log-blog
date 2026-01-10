import { create } from 'zustand';

export type CategoryProps = {
  name: string;
  id: string;
};

type CategoryModalProps = {
  category: CategoryProps | undefined;
  setCategory: (category: CategoryProps) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useCategories = create<CategoryModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  category: undefined,
  setCategory: (category: CategoryProps) => set({ category }),
}));
