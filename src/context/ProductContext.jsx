import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({children})=>{
  const [filters,setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    brands: [],
    search: "",
    filterSearch: "",
  });

  return(
    <ProductContext.Provider value={{filters,setFilters}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext =()=>useContext(ProductContext);