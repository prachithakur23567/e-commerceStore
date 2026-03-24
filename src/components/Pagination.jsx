import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useEffect} from "react";
export default function Pagination({page,setPage,total}){
  const limit = 8;
  const totalPages=Math.max(1,Math.ceil(total/limit));
  const maxPagesToShow=4
  let startPage =Math.max(1,page-Math.floor(maxPagesToShow/2));
  let endPage = startPage+maxPagesToShow-1;
  if (endPage>totalPages){
    endPage=totalPages;
    startPage=Math.max(1,endPage-maxPagesToShow+1);
  }
  const pages = [];
  for (let i =startPage;i<=endPage;i++) {
    pages.push(i);
  }
  useEffect(()=>{
    window.scrollTo({top:0});
    document.body.style.overflow="hidden";

    return()=>{
      document.body.style.overflow="auto";
    };
  },[page]);

  if(totalPages<=1) 
    return null;

  const goToPage=(p)=>{
    if(p>=1&& p<=totalPages) {
      setPage(p);
    }
  };

  return(
    <div className="flex flex-col items-center mt-6 gap-3">
      <div className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={()=>goToPage(page-1)}
          disabled={page===1}
          className="px-3 py-1 text-sm border rounded bg-white text-gray-600 font-semibold hover:bg-gray-100 disabled:opacity-40 inline-flex items-center"
        >
          <ArrowBackIcon sx={{fontSize:16,marginRight:"4px"}} />
          Previous
        </button>
        {pages.map((p)=>(
          <button
            key={p}
            onClick={()=>goToPage(p)}
            className={`px-3 py-1 text-sm border rounded ${
              p === page?"bg-blue-500 text-white":"bg-white text-gray-700 hover:bg-gray-100"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={()=>goToPage(page+1)}
          disabled={page===totalPages}
          className="px-3 py-1 text-sm border rounded bg-white text-gray-600 font-semibold hover:bg-gray-100 disabled:opacity-40 inline-flex items-center">
          Next
          <ArrowForwardIcon sx={{fontSize:16,marginLeft:"4px"}}/>
        </button>
      </div>
    </div>
  );
}