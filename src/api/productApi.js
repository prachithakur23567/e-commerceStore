const BASE_URL = "https://dummyjson.com/products";
export const fetchProducts= async(limit,skip)=>{
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return res.json();
};

export const fetchCategories= async()=>{
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

export const fetchByCategory =async(category)=>{
  const res = await fetch(`https://dummyjson.com/products/category/${category}`);
  return res.json();
};

export const fetchProductById = async(id)=>{
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};