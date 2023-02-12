import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Footer = () => {
  return (
    <Container image={"./assets/w2.jpg"}>
        <Wrapper>
            <Content>
                <Box>
                    <Logo>
                        <span>IPDC BLOG</span>
                    </Logo>
                    <p>Share your experience of the Park and Beyond.</p>
                    <Icon>
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-instagram"></i>
                    </Icon>
                </Box>

                <Box>
                    <h3>Contact Info</h3>
                    <Address>
                        <Item>
                        <Icon>
                            <i className="fas fa-map-marker-alt"></i>
                        </Icon>
                        <Description>
                            <h5>Our Location:</h5>
                            <span>Addis Ababa, Ethiopia</span>
                        </Description>
                        </Item>
                        <Item>
                        <Icon>
                            <i className="fas fa-phone-alt"></i>
                        </Icon>
                        <Description>
                            <h5>Phone Number:</h5>
                            <span>+123 456 789</span>
                            <span>+123 456 789</span>
                        </Description>
                        </Item>
                    </Address>
                </Box>

                <Box>
                    <h3>Important Links</h3>
                    <Description>
                        <Link className="link" to="/">Home</Link>
                        <Link className="link" to="/login">Login</Link>
                        <Link className="link" to="/write">Write</Link>
                        <Link className="link" to="/about">About Us</Link>
                        <Link className="link" to="/contact">Contact Us</Link>
                    </Description>
                </Box>
            </Content>
            <Legal>
                <p>Copyright (c) 2023 Copyright Holder All Rights Reserved.</p>
            </Legal>
        </Wrapper>
    </Container>
  )
}

const Container = styled.div`
   background-color: #246866;
   color: white;
    background-size: cover;
    position: relative;
    z-index: 2;

`;

const Wrapper = styled.div`
    
`;

const Content = styled.div`
    padding: 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    ${mobile({
        gridTemplateColumns: "repeat(1, 1fr)",
        padding: "10px 10px"
    })}
`;

const Box = styled.div`
    ${mobile({
        width: "100%",
    })}
p {
    margin-top: 20px;
    color: #white;
    opacity: 0.7;
    margin-bottom: 30px;
    line-height: 25px;

    ${mobile({
        fontSize: "13px",
        lineHeight: "20px",
    })}
}

h3 {
    color: white;
    font-size: 25px;
    font-weight: 800;
    border-bottom: 3px solid #fff;
    margin-bottom: 30px;
}
`;

const Logo = styled.div`
    span{
        font-size: 42px;
        font-weight: bold;
        font-family: 'Josefin Sans', sans-serif;
    }
`;

const Icon = styled.div`
    display: flex;

    i {
    font-size: 35px;
    margin-right: 20px;
    color: #f5ecec;
    cursor: pointer;
}
`;

const Address = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
h5 {
    color: #f3e8e8;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
}
`;

const Item = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

const Description = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-around;

    .link{
        margin-top: 5px;
    }
`;

const Legal = styled.div`
    border-top: 1px solid rgba(253, 244, 244, 0.5);

    p {
    margin: 0;
    padding: 30px 0px 30px 30px;
    color: white;
    opacity: 0.7;
    line-height: 25px;
    font-size: 13px;
  }
`;


export default Footer