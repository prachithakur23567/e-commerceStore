import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../../hooks/useDebounce";
import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { fetchCategories } from "../../api/productApi";

export default function CategoryFilter({activeFilter,setActiveFilter}) {
  const [search,setSearch] = useState("");
  const debouncedSearch = useDebounce(search,300);
  const {filters,setFilters} = useProductContext();
  const isOpen = activeFilter === "category";
  const {data,loading} = useFetch(fetchCategories,[]);
  const categories = data||[];

  const filteredCategories = useMemo(()=>{
    return categories.filter((cat) =>cat?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [categories,debouncedSearch]);
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="relative mb-4">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          sx={{ fontSize: 20 }}/>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none"/>
      </div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={()=>setActiveFilter(isOpen?null : "category")}>
        <h3 className="font-bold text-gray-700">Categories</h3>
        <span className="text-gray-500 text-lg">
          {isOpen?"-" : "+"}
        </span>
      </div>
      {isOpen&&(
        <div className="mt-3 max-h-60 overflow-y-auto">
          {loading&&(
            <p className="text-sm text-gray-400">Loading categories...</p>
          )}
          {!loading&&filteredCategories.length===0&&(
            <p className="text-sm text-gray-400">No categories found</p>
          )}
          {!loading&&filteredCategories.map((cat)=>(
              <label
                key={cat?.slug}
                className="flex items-center gap-2 mb-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category === cat.slug}
                  onChange={() => {
                    setFilters({
                      ...filters,
                      category:filters.category === cat.slug?"":cat.slug,});
                    setActiveFilter(null);
                  }}
                />
                {cat.name}
              </label>
            ))}
        </div>
      )}
    </div>
  );
}