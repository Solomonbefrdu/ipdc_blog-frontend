import styled from "styled-components"
import { mobile } from "../responsive";

const Header = () => {
  return (
    <Container>
        <Titles>
            <span className="headerTitleSm">Hawassa Industrial Park</span>
            <span className="headerTitleLg">BLOG</span>
        </Titles>
        <img
            className="headerImg"
            src={ window.innerWidth > 1000 ? "./assets/cover.jpg" : "./assets/cover2.jpg"}
            alt=""
        />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 60px;
  margin-bottom: 5%;
  background-size: cover;
  ${mobile({
    marginTop: "30px"
    })}

  .headerImg {
    width: 100%;
    height: 450px;
    margin-top: 80px;
    object-fit: cover;

    ${mobile({
      objectFit: "cover",
      marginTop: "5%",
      height: "60vh"
    })}
    }
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lora", serif;
  color: #166d6d;

  ${mobile({
    display: "none"
    })}

  .headerTitleSm {
        position: absolute;
        top: 18%;
        font-size: 20px;
    }

    .headerTitleLg {
        position: absolute;
        top: 20%;
        font-size: 100px;

        ${mobile({
        fontSize: "50px"
        })}
    }
`;

export default Header