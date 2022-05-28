import { SearchOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";






const Wraper = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 300px;
  height: 390px;
  flex-grow:0.5;
  flex-direction:column;
  background-color: #f5fbfd;
  position: relative;
  align-items: center;
  justify-content: center;
  ${mobile({ flexBasis: "fill" ,flexGrow:"1"})}
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;



const Container = styled.div`
  
  
  min-width: 280px;
  height: 310px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;


const Image = styled.img`
object-fit: cover;
width:100%;
  height: 100%;
  
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

 const ProductInfo = styled.div`
 display:flex;
 flex-direction:column;
 bottom: 0;

 `;
 const Name = styled.span`
 flex:1;
 font-size:20px;
 `;
 const Gender = styled.span`
 flex:1;
 color:#838585;
 font-size:20px;
`;



const Price = styled.span`
 flex:1;
 color:#c94949;
 font-size:20px;
`;

const Product = ({ item }) => {
  return (
    <Wraper>
    <Container>
      <Image src={item.img} />
      <Info>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
    <ProductInfo>
    <Name>
        {item.title}
    </Name>
    <Gender>
    {item.gender}`s shoe
    </Gender>
    <Price>
        $ {item.price}
    </Price>
  </ProductInfo>
  </Wraper>
  );
};

export default Product;
