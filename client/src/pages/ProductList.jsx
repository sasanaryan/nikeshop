import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {Slider } from "@material-ui/core";
 
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  display:flex;
  justify-content: center;

`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Filter = styled.div`
  
  flex:1;
  margin: 20px;
  @media only screen and (min-width: 770px) {
    justify-content:center; 
    align-items:center;
    flex-direction: row;
    }
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" ,})}
`;

const Sort = styled.div`
  flex:1;
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const Price = styled.div`
  flex:2;
  margin: 20px;
  ${mobile({ display: "flex",width:"85%" })}
`;


const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  font-weight: 400;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [gender , setGender]=useState("No gender");
  const [range , setRange]= useState([50,150]);
  const [sort , setSort]=useState("newest");
  const handleChange = (event , value) => {
     setRange(value)
  }; 
  const valuetext = (value) => `${value}`;
  const customMarks = [

    {
      value : 50,
      label: "50 $"
    }, 
    {
      value : 100,
      label: "100 $"
    },
    {
      value : 150,
      label: "150 $"
    }
  ];

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Gender:</FilterText>
          <Select name = "gender" onChange={(e) => setGender(e.target.value)}>
            <option>No gender</option>
            <Option >women</Option>
            <Option>men</Option>
          </Select>
        </Filter>
        <Price>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            min = {50}
            max = {150}
            value = {range}
            marks = {customMarks}
            step={5}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            onChange={handleChange}
          />
        </Price>
        <Sort>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value = "newest" selected>Newest</Option>
            <Option value = "asc">Price (asc)</Option>
            <Option value = "desc">Price (desc)</Option>
          </Select>
        </Sort>
      </FilterContainer>
      <Products gender={gender} range={range} cat ={cat} sort ={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
