import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { FiMenu, FiSearch } from "react-icons/fi";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useDebounce from "../hooks/useDebounce";
export default function Navbar({toggleFilters}){
  const {filters,setFilters}= useProductContext();
  const [search,setSearch]= useState("");
  const debouncedSearch = useDebounce(search,500);
  useEffect(()=>{setFilters((prev)=>({
  ...prev,search: debouncedSearch,
  }));
},[debouncedSearch]);
  return(
    <div className="bg-slate-700 px-6 py-3 flex items-center justify-between">
      <FiMenu
        onClick={toggleFilters}
        className="text-white text-2xl cursor-pointer"
      />
      <div className="w-1/2 relative">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full px-10 py-2 rounded-md outline-none"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
      </div>
      <div className="flex items-center gap-6 text-gray-300">
        <ShoppingCartIcon
          sx={{ fontSize: 26,cursor:"pointer","&:hover":{ opacity:0.7 }}}
        />
        <PersonIcon
          sx={{fontSize:26,cursor:"pointer","&:hover":{opacity:0.7}}}
        />
        <AccountCircleIcon
          sx={{fontSize:26,cursor:"pointer","&:hover":{opacity:0.7}}}
        />
      </div>
    </div>
  );
}
