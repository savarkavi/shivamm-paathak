"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CategoryContextType = {
  currentCategory: string | null;
  setCurrentCategory: (cat: string) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [currentCategory, setCurrentCategory] = useState<string>("Commercial");

  return (
    <CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
