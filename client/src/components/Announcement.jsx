import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #fdfdfd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Image = styled.img`
  
  position:relative;
  height:30px;

`;
const Announcement = () => {
  return <Container><Image src="https://i.pinimg.com/originals/03/0c/88/030c88991367c3f926c255b5bd9ff831.jpg"/></Container>;
};

export default Announcement;
