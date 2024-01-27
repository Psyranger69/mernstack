import { CategoriesContext } from "../context/CategoryContext";
import { useContext } from "react";

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw Error(
      "useCategoriesContext must be inside the CategoriesContextProvider"
    );
  }

  return context;
};
