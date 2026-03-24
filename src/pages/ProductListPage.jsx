import { useState, useEffect } from "react";
import useProducts from "../hooks/useProducts";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PriceFilter from "../components/Filters/PriceFilter";
import BrandFilter from "../components/Filters/BrandFilter";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useProductContext } from "../context/ProductContext";
import FindReplaceIcon from "@mui/icons-material/FindReplace";

export default function ProductListPage(){
  const [page,setPage]=useState(1);
  const [showFilters,setShowFilters]=useState(true);
  const [activeFilter,setActiveFilter]=useState(null);

  const {filters}=useProductContext();
  const {products,total,loading }=useProducts(page);

  useEffect(()=>{
    setPage(1);
  },[filters]);

  return(
    <div className="h-screen flex flex-col overflow-hidden">
    
      <div className="flex-shrink-0">
        <Navbar toggleFilters={()=>setShowFilters(!showFilters)}/>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {showFilters&&(
          <div className="w-[280px] h-full bg-[#f3f4f6] p-4 overflow-hidden">
            <CategoryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <PriceFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <BrandFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>
        )}
        <div
          className={`${showFilters ? "w-3/4" : "w-full"} h-full flex flex-col overflow-hidden`}
        >
        
          <div
            className="flex items-center gap-2 px-4 py-3 cursor-pointer flex-shrink-0"
            onClick={()=>setShowFilters(!showFilters)}
          >
            <FindReplaceIcon sx={{fontSize:24,color:"#6b7280"}} />
            <h2 className="font-bold text-gray-700 text-lg">Filters</h2>
          </div>
          <div className="flex-1 overflow-hidden px-4">
            {loading?(
              <Loader />
            ) : products.length===0?(
              <div className="text-center mt-10 text-xl font-semibold text-gray-500">
                Product Not Found
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {products.map((p)=>(
    <ProductCard key={p?.id} product={p} />
                ))}
              </div>
            )}
            {products.length>0&&(
              <Pagination page={page} setPage={setPage} total={total}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}