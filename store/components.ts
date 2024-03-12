import { create } from 'zustand';

type CurrentCategory = {
    name: string;
    subcategories?: { name: string, id: string }[]
}

type ComponentsStore = {
    isSubcategoriesOpen: boolean;
    isSidebarOpen: boolean;
    currentCategory: CurrentCategory;
    openSidebar: () => void;
    closeSidebar: () => void;
    setCurrentCategory: (props: CurrentCategory) => void;
    openSubcategories: () => void;
    closeSubcategories: () => void;
};

export const useComponentsStore = create<ComponentsStore>((set) => ({
    isSubcategoriesOpen: false,
    isSidebarOpen: false,
    currentCategory: {
        name: ''
    },
    openSidebar: () => set((state) => ({ ...state, isSidebarOpen: true })),
    closeSidebar: () => set((state) => ({ ...state, isSidebarOpen: false })),
    setCurrentCategory: (props: CurrentCategory) => set((state) => ({ ...state, currentCategory: props })),
    openSubcategories: () => set((state) => ({ ...state, isSubcategoriesOpen: true })),
    closeSubcategories: () => set((state) => ({ ...state, isSubcategoriesOpen: false })),
}));