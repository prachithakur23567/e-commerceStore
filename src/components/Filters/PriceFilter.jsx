import { useState, useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
export default function PriceFilter(){
  const {filters,setFilters}=useProductContext();
  const [min,setMin] = useState("");
  const [max,setMax] = useState("");
  const [error,setError] = useState("");
  useEffect(()=>{
if(filters.minPrice!==undefined&&filters.minPrice!== ""){
    setMin(String(filters.minPrice));
  }else{
    setMin("");
  }
if(filters.maxPrice!==undefined&&filters.maxPrice!== ""){
    setMax(String(filters.maxPrice));
  }else{
    setMax("");
  }
},[filters.minPrice,filters.maxPrice]);
  const handleApply=()=>{
    if(min && max &&Number(min)>Number(max)){
      setError("Min price cannot be greater than max price");
      return;
    }
    setError("");
    setFilters({
      ...filters,minPrice:min?Number(min):"",maxPrice:max?Number(max):"",
    });
  };
  const handleMinChange=(value)=>{
    if (/^\d*$/.test(value)){
      setMin(value);
      setError("");
    } else{
      setError("Numbers Only");
    }
  };

  const handleMaxChange=(value)=>{
    if (/^\d*$/.test(value)){
      setMax(value);
      setError("");
    } else{
      setError("Numbers Only");
    }
  };

  return(
    <div className="mb-6 border-b border-gray-200 pb-4">
      <h3 className="font-bold mb-3 text-gray-700">
        Price Range
      </h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Min"
          value={min}
          onChange={(e)=>handleMinChange(e.target.value)}
          className="w-1/2 px-2 py-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="Max"
          value={max}
          onChange={(e)=>handleMaxChange(e.target.value)}
          className="w-1/2 px-2 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>
      {error&&(<p className="text-red-500 text-xs mb-2">{error}</p>)}
      <button
        onClick={handleApply}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm"
  >
        Apply
      </button>
    </div>
  );
}