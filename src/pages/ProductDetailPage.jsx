
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/productApi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ProductDetailPage() {
  const {id} =useParams();
  const navigate=useNavigate();

  const [product,setProduct]=useState(null);
  const [currentImageIndex,setCurrentImageIndex]=useState(0);

  useEffect(()=>{
    const load=async()=>{
      const data =await fetchProducts(100,0);
      const found=data.products.find((p)=>p?.id=== Number(id));
      setProduct(found);
    };load();
  },[id]);

  if(!product) return <div className="p-5">Loading...</div>;

  const images=product?.images||[];
  return(
    <div className="p-6">
    <button
  onClick={()=>navigate("/")}
  className="mb-4 px-4 py-2 font-semibold border rounded flex items-center gap-1">
  <ArrowBackIcon sx={{fontSize:18}} />
  Back
</button>
      <div className="flex gap-10">
        <div className="w-1/2 flex flex-col justify-between">
  <div className="flex justify-center items-center flex-1">
    <img
      src={images[currentImageIndex]}
      alt={product?.title}
      className="max-h-[380px] w-full object-contain drop-shadow-md"
    />
  </div>
  <div className="flex justify-center items-center gap-2 mt-6">
    <button
onClick={()=>setCurrentImageIndex((prev)=>prev-1)
      }
      disabled={currentImageIndex===0}
      className="px-3 py-1 border rounded disabled:opacity-50 flex items-center gap-1">
     <ArrowBackIcon sx={{fontSize:18}} />
      Previous
    </button>
    {images.slice(0,5).map((img,i)=>(
      <button
        key={i}
        onClick={()=>setCurrentImageIndex(i)}
        className={`px-3 py-1 border rounded ${ i===currentImageIndex?"bg-blue-500 text-white":""}`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={()=>setCurrentImageIndex((prev)=>prev+1)
      }
      disabled={currentImageIndex===images.length-1}
      className="px-3 py-1 border rounded disabled:opacity-50 flex items-center gap-1"
    >
      Next 
      <ArrowForwardIcon sx={{fontSize:18}}/>
    </button>
  </div>
</div>
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-2">
            {product?.title}
          </h1>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xl font-bold">${product?.price}</p>
            <p className="text-yellow-500">
              ⭐ {product?.rating}
            </p>
          </div>
          <p className="mb-1">
            <span className="font-semibold">Brand:</span>{" "}
            {product?.brand}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Category:</span>{" "}
            {product?.category}
          </p>
          <hr className="my-4" />
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600 mb-4">
            {product?.description}
          </p>
          <hr className="my-4" />
          <h3 className="font-semibold mb-3">Reviews</h3>
          {product.reviews?.map((r, i)=>(
            <div key={i} className="mb-3">
              <p className="font-medium">
                {r.reviewerName} ⭐ {r.rating}
              </p>
              <p className="text-gray-600 text-sm">{r?.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

