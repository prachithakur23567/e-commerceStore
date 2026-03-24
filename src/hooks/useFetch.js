import { useEffect, useState } from "react";

export default function useFetch(fetchFn,deps=[]){
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    let isMounted = true;

    const load = async()=>{
      setLoading(true);
      try{
        const res = await fetchFn();
        if(isMounted) setData(res);
      }catch(e){
        console.error(e);
      }
      setLoading(false);
    };

    load();

    return()=>{
      isMounted = false;
    };
  }, deps);

  return {data,loading};
}