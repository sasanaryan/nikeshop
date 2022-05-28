import { Badge } from "@material-ui/core";
import {  ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useSelector} from "react-redux"
import { Link } from "react-router-dom";
import User from "./User";

const Container = styled.div`
  background-color: #ecedee;
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px"   })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;


const Logo = styled.img`
  position :relative;
  top:-5px;
  height: 60px;
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`  
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, margin: "0px 8px 0px 0px" })}
`;

const MenuIt = styled.span`
text-decoration-line: none;
text-decoration-color: none;
text-decoration-style: none;
text-decoration-thickness: none;
text-decoration: none;
wight:400;
  position : relative;
  top:-10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration:none;
  ${mobile({ fontSize: "12px", marginLeft: "20px" , right: "5px" })}
`;

const Profile = styled.div`
position:relative;
top:-10px;
height: 35px;
display: flex;
align-items: center;
 font-weight: bold;
 border: 1.5px solid #738874;
 border-style: none solid none solid;
 background-color: #ecedee;
 cursor: pointer;
  margin-right: 15px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Photo = styled.img`
 width:30px;
 margin-left:5px;
margin-right:5px;
 border-radius:15px;
 
`;


const Navbar = () => {
  const quantity = useSelector( state => state.cart.quantity);
  const user = useSelector( state => state.user.currentUser);
  
  

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
          <Logo src="https://www.transparentpng.com/thumb/nike-logo/6KinEm-nike-logo-transparent.png"/>
          </Link>
        </Left>
        <Right>
          { user ? <Profile>
            <Photo src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE="/>
            <User username={user.username}/>
          </Profile>
          :
          <>
          <Link to="/register" sx={{textDecoration:"none"}}>
            <MenuIt>REGISTER</MenuIt>
          </Link>
          <Link to="/login" sx={{textDecoration:"none"}}>
          <MenuIt >SIGN IN</MenuIt>
          </Link>
            </>
          }
          <Link to ="/cart" sx={{textDecoration:"none"}}>
          <MenuIt>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuIt>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
