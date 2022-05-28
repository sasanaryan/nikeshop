import styled from "styled-components";
import { mobile } from "../responsive";
import { tablet } from "../responsive";
import {useDispatch ,useSelector} from "react-redux";
import { useState , useEffect  } from "react";
import {register} from "../redux/apiC"

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
  width: 30%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "40%" })}
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  
`;

const Unit = styled.div`
  flex: 1;
  min-width: 90%;
  margin: 5px 7px 0px 0px;
  
`;

const Input = styled.input`
  
  min-width: 70%;
  margin: 3px 0px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  background-color: blue;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  &:disabled{
    color:green;
    cursor: not-allowed;
    }
`;

const Err = styled.p`
  padding:5px;
  font-size: 15px;
  border: none;
  
  color: #b30000;
  
`;

const Register = () => {
  const dispatch = useDispatch();
  const {isFatching } = useSelector(state=>state.user);

  const initialValue = {username:"",email:"",password:"" , confirmPassword:"" };
  const [formValues,setFormValues] = useState(initialValue);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  

  const validate = (values) => {
    const errors = {};
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!values.username){
      errors.username = "username is required !";
    }
    if (!values.email){
      errors.email = "email is required!";
    }else if (!regex.test(values.email)){
      errors.email = "email is not a valid format !";
    }
    if (!values.password){
      errors.password = "password is required !";
    } else if (values.password.length < 6 ){
      errors.password = "password must be more than 6 characters !";
    } else if (values.password.length > 12 ){
      errors.password = "password cannot exceed more than 12 characters !";
    }
    if (values.password !== values.confirmPassword){
      errors.confirmPassword = "password not match !";
    }
      return errors;
  };
  
  const handleChange = (e) => {
    const {name,value}=e.target;
    setFormValues({...formValues,[name]:value});
  };
  
  const handleRegister = (e) => {
  e.preventDefault();
  setFormErrors(validate(formValues));
  setIsSubmit(true);
  };

  useEffect(()=>{
    const {confirmPassword,...other} = formValues;
    if (Object.keys(formErrors).length === 0 && isSubmit ){
      register(dispatch,{...other});
    }
  },[formErrors , isSubmit])

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Unit>
          <Input placeholder="username"  
          name="username"
          type="text"
          value={formValues.username}
          onChange={handleChange}/>
          <Err>{formErrors.username}</Err>
          </Unit>
          <Unit>
          <Input placeholder="email" 
          name="email"
          type="text"
          value={formValues.setEmail}
          onChange={handleChange}/>
          <Err>{formErrors.email}</Err>
          </Unit>
          <Unit>
          <Input placeholder="password" 
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}/>
          <Err>{formErrors.password}</Err>
          </Unit>
          <Unit>
          <Input placeholder="confirm password"
          name="confirmPassword"
          type="password"
          value={formValues.confirmPassword}
          onChange={handleChange} />
          <Err>{formErrors.confirmPassword}</Err>
          </Unit>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister} disabled={isFatching}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
