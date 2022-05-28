import styled from "styled-components";
import Product from "./Product";
import {baseurl} from "../config";
import { useState , useEffect} from "react";

const Container = styled.div`
    width:100wv;
    padding: 20px;
    display: flex;
    align-content:flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,sort,gender,range}) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  
  
  useEffect(() => {
   const getProducts = async () => {
     try{
       const res = await baseurl.get(cat ? `/products?category=${cat}` : "/products" );
       setProducts(res.data);
     }catch(err){
       console.log(err);
     }
   }
   getProducts();
  }, [cat]);

  useEffect( () => {
    cat && setFilter(
      products.filter((item) => item.price <= range[1] && range[0] <= item.price));
  },[products,cat,range,gender]);

  useEffect( () => {
    gender !== "No gender" && setFilter((prev)=>
    [...prev].filter((item) => item.gender === gender)
    );
  },[gender,range]);

  useEffect( () => {
    if(sort === "newest" ) {
      setFilter((prev)=>
      [...prev].sort((a,b)=> a.createdAt - b.createdAt))
      }else if (sort === "asc" ) {
      setFilter((prev)=>
      [...prev].sort((a,b)=> a.price - b.price))
    }else  {
      setFilter((prev)=>
      [...prev].sort((a,b)=> b.price - a.price))
    }
}, [sort])

  return (
    < Container >
      {cat ? 
      filter.map((item) => (<Product item={item} key={item.id} />))
      :
      products.slice(0,12).map((item) => (<Product item={item} key={item.id} />))
      }
    </Container>
  );
};

export default Products;
