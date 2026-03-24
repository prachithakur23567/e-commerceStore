import { useNavigate } from "react-router-dom";
import StarsIcon from '@mui/icons-material/Stars';

export default function ProductCard({product}){
  const navigate = useNavigate();
return(
    <div
  onClick={()=>navigate(`/product/${product.id}`)}
  className="border rounded-lg p-3 cursor-pointer hover:shadow-sm transition-all bg-white h-full flex flex-col justify-between"
>
<div className="h-32 flex items-center justify-center mb-3">
        <img
          src={product?.thumbnail}
          alt={product?.title}
          className="h-full object-contain"
        />
      </div>
<h3 className="text-sm font-semibold text-gray-800 mb-1">
        {product?.title}
      </h3>

      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">
          ${product?.price}
        </p>

        <div className="flex items-center text-yellow-500 text-sm">
          ⭐⭐⭐⭐☆
          <span className="text-gray-500 text-xs ml-1">
            ({product?.rating})
          </span>
        </div>
      </div>
    </div>
  );
}