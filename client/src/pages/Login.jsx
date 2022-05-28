import styled from "styled-components";
import {mobile} from "../responsive";
import {tablet} from "../responsive";
import { useState , useEffect } from "react";
import { login } from "../redux/apiC";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35463b103211209.5f8d57c277188.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "50%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Unit = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 3px;
  
`;

const Input = styled.input`
  
  min-width: 90%;
  margin:  4px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: blue;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
  &:disabled{
  color:green;
  cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
color  : red;
`
const Err = styled.p`
padding:5px;
  font-size: 15px;
  border: none;
  color: #b30000;
`;



const Login = () => {
  const initialValue = {username:"",password:""  }
  const [formValues,setFormValues] = useState(initialValue);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  
  
  const dispatch = useDispatch();
  const {isFatching , error} = useSelector(state=>state.user);

  const validate = (values) => {
    const errors = {};
    if (!values.username){
      errors.username = "username is required !";
    }
    if (!values.password){
      errors.password = "password is required !";
    } else if (values.password.length < 6 ){
      errors.password = "password must be more than 6 characters !";
    } else if (values.password.length > 12 ){
      errors.password = "password cannot exceed more than 12 characters !";
    }
      return errors;
  };

  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormValues({...formValues,[name]:value});
  };
  

  const handleLogin = (e) => {
  e.preventDefault();
  setFormErrors(validate(formValues));
  setIsSubmit(true);
  };


 useEffect(()=>{
    if (Object.keys(formErrors).length === 0 && isSubmit ){ 
      login(dispatch,formValues);
    }
  },[formErrors , isSubmit])
  
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Unit>
          <Input 
          type="text"
          name="username"
          value={formValues.username}
          placeholder="username"
           onChange={handleChange} />
           <Err>
             {formErrors.username}
           </Err>
          </Unit>
          <Unit>
          <Input 
          type="password"
          name="password"
          value={formValues.password}
          placeholder="password"
          onChange={handleChange}  />
          <Err>
             {formErrors.password}
           </Err>
          </Unit>
          
          <Button onClick={handleLogin} disabled={isFatching}>LOGIN</Button>
          {error && <Error>Something Wrong ...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
