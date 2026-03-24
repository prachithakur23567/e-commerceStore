import { useEffect, useState } from "react";
import { fetchProducts, fetchByCategory } from "../api/productApi";
import { applyFilters } from "../utils/helpers";
import { useProductContext } from "../context/ProductContext";

export default function useProducts(page) {
  const {filters} = useProductContext();

  const [products,setProducts] = useState([]);
  const [total,setTotal] = useState(0);
  const [loading,setLoading] = useState(false);

  const limit = 8;
  const skip = (page-1)*limit;

  useEffect(()=>{
    const load = async()=>{
      setLoading(true);
      try {
        let data;
const CategorySelected = filters.category?true:false;
const BrandSelected = filters.brands.length>0?true:false;
const MinPriceSet = filters.minPrice?true:false;
const MaxPriceSet = filters.maxPrice?true:false;
const SearchUsed = filters.search?true:false;

const isFilterApplied =CategorySelected||BrandSelected||MinPriceSet||MaxPriceSet ||SearchUsed;
        if(!isFilterApplied){
          data = await fetchProducts(limit,skip);
          setProducts(data.products);
          setTotal(data.total);
        }


        else{
          if(filters?.category){
            data = await fetchByCategory(filters?.category);
          }else{
            data = await fetchProducts(0,0);
          }

          let filtered = applyFilters(data.products,filters);

          const paginated = filtered.slice(skip,skip+limit);

          setProducts(paginated);
          setTotal(filtered.length);
        }
      }catch(e){
        console.error(e);
      }
      setLoading(false);
    };

    load();
  },[filters,page]);

  return {products,total,loading};
}