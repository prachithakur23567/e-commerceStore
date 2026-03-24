export const getUniqueBrands = (products)=>{
  const brandList = products.map((product)=>product.brand).filter((brand)=>brand?true:false);
return [...new Set(brandList)];
};

export const applyFilters = (products,filters)=>{
  return products.filter((product)=>{
//Filteration For price
    const isAboveMinPrice =filters.minPrice? product.price>=filters.minPrice:true;

    const isBelowMaxPrice =filters.maxPrice? product.price <=filters.maxPrice: true;
      
    const priceCheck =isAboveMinPrice&& isBelowMaxPrice;


    const brandCheck =
      filters.brands.length=== 0? true: filters.brands.includes(product.brand);
    const searchValue = filters.search? filters.search.toLowerCase(): "";
    const titleMatch = product.title?product.title.toLowerCase().includes(searchValue):false;
    const categoryMatch = product.category? product.category.toLowerCase().includes(searchValue): false;

    const searchCheck =searchValue === ""? true: titleMatch || categoryMatch;
    return priceCheck && brandCheck && searchCheck;
  });
};