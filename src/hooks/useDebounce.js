import { useEffect, useState } from "react";

export default function useDebounce(value,delay){
  const [debouncedValue,setDebouncedValue] =useState(value);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedValue(value);
    },delay);
//clearquickly input
    return ()=>clearTimeout(timer);
  },[value,delay]);

  return debouncedValue;
}