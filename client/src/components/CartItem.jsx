import React from 'react';
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { removeItemFromCart, addQuantityToItem, subtractQuantityFromItem } from "../redux/cartRedux";


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom:10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;



const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Button = styled.button`
border:none;
  width: 75px;
  padding: 5px;
  font-weight: 600;
  cursor:pointer;

`;


const CartItem = ({ product, id, index }) => {

  const dispatch = useDispatch();



  const handleRemove = () => {
    dispatch(removeItemFromCart({ id, index }));
  };

  const subtractQuantity = () => {
    product.quantity > 1 &&
      dispatch(subtractQuantityFromItem({ id, index }));
  };

  const addQuantity = () => {
    dispatch(addQuantityToItem({ id, index }));
  };

  return (
    <Product >
      <ProductDetail>
        <Image src={product.img} />
        <Details>
          <ProductName>
            <b>Product:</b> {product.title}
          </ProductName>

          <ProductColor>
            {product.gender}
          </ProductColor>
          <ProductSize>
            <b>Size:</b> {product.size}
          </ProductSize>
          <Button onClick={handleRemove}>
            <RemoveShoppingCartIcon />
          </Button>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add onClick={addQuantity} />
          <ProductAmount>{product.quantity}</ProductAmount>
          <Remove onClick={subtractQuantity} />
        </ProductAmountContainer>
        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
      </PriceDetail>
    </Product>
  )
};

export default CartItem;
