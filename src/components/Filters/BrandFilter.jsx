import { useProductContext } from "../../context/ProductContext";
import useDebounce from "../../hooks/useDebounce";
import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { fetchProducts, fetchByCategory } from "../../api/productApi";
import { getUniqueBrands } from "../../utils/helpers";

export default function BrandFilter({activeFilter,setActiveFilter}){
  const {filters,setFilters}=useProductContext();
  const isOpen=activeFilter==="brand";
  const debouncedSearch =useDebounce(filters.filterSearch||"",300);
  const { data, loading } = useFetch(()=>{
    return filters.category? fetchByCategory(filters.category):fetchProducts(100, 0);
  },[filters.category]);
  const brands = data?.products? getUniqueBrands(data.products):[];
  const filteredBrands = useMemo(()=>{
    return brands.filter((b) =>b && b.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [brands, debouncedSearch]);

  const toggleBrand =(brand)=>{
    const exists=filters?.brands.includes(brand);
    const updated=exists?filters.brands.filter((b) =>b!== brand):[...filters.brands, brand];
    setFilters({ ...filters, brands: updated });
    setActiveFilter(null);
  };
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() =>setActiveFilter(isOpen ? null : "brand")}>
        <h3 className="font-bold text-gray-700">Brands</h3>
        <span className="text-gray-500 text-lg">
          {isOpen ? "-" : "+"}
        </span>
      </div>
      {isOpen&&(
        <div className="mt-3 max-h-60 overflow-y-auto">
          {loading&&( <p className="text-sm text-gray-400">Loading brands...</p>
          )}
          {!loading&&filteredBrands?.length === 0 && (
            <p className="text-sm text-gray-400">No brands found</p>)}

          {!loading&&filteredBrands.map((b)=>(
              <label
                key={b}
                className="flex items-center gap-2 mb-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters?.brands.includes(b)}
                  onChange={() => toggleBrand(b)}/>
                {b}
              </label>
            ))}
        </div>
      )}
    </div>
  );
}