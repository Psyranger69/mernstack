import { createContext, useReducer } from "react";

export const CategoriesContext = createContext();

export const categoriesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        categories: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        categories: [action.payload, ...state.categories],
      };
    case "CREATE_SUB_CATEGORY":
      return {
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };
    case "DELETE_CATEGORY":
      // console.log(action.type, action.payload);
      return {
        categories: state.categories.filter(
          (cat) => cat._id !== action.payload._id
        ),
      };
    case "DELETE_SUB_CATEGORY":
      // console.log(action.type, action.payload);
      return {
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };
    default:
      return state;
  }
};

export const CategoriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    categories: null,
  });
  return (
    <CategoriesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};
