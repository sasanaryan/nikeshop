import CartItem from "../components/CartItem";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { Collapse, List } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';

const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div`
width:100wv;
`;

const Wrapper = styled.div`
  width:95wv;
  padding: 20px;
  ${mobile({ padding: "10px" })}
  ${tablet({ padding: "15px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;


const Bottom = styled.div`
  width:90wv;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
  ${tablet({ flex: "1" })}
`;


const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
align-items: center;
justify-content: center;
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  ${tablet({ marginTop: "10px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 25px 3px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const But = styled.button`
  
  width: 95%;
  padding: 10px;
  background-color: green;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token)
  };





  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Bottom>
          <Info>
            <List>
              <TransitionGroup>
                {cart.products.map((product, index) => (
                  <Collapse >
                    <CartItem
                      key={product._id}
                      index={index}
                      product={product}
                      id={product._id}
                    />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="NIKE"
              image="https://assets.webiconspng.com/uploads/2017/09/Nike-PNG-Image-51113.png"
              billingAddress
              shippingAddress
              description={`Yor total is ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <But>CHECKOUT NOW</But>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
