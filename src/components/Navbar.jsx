import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../Redux/authRedux";
import { mobile } from "../responsive";
 
const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
  return (
    <Container>
        <Wrapper>
            <Left>
                <i className="navIcon fab fa-facebook"></i>
                <i className="navIcon fab fa-instagram"></i>
                <i className="navIcon fab fa-pinterest"></i>
                <i className="navIcon fab fa-twitter"></i>
            </Left>
            <Center>
                <List>
                    <ListItem>
                        <Link className="link" to="/">HOME</Link>
                    </ListItem>
                    <ListItem>
                        <Link className="link" to="/about">ABOUT</Link>
                    </ListItem>
                    <ListItem>
                        <Link className="link" to="/contact">CONTACT</Link>
                    </ListItem>
                    <ListItem>
                        <Link className="link" to="/write">WRITE</Link>
                    </ListItem>
                    { user && 
                    <ListItem onClick={()=>dispatch(logoutSuccess())}>LOGOUT</ListItem>
                }
                </List>
            </Center>
            <Right>
                { user ? (
                    <Link className="link" to="/settings">
                        <img
                            className="topImg"
                            src= {user?.data?.picturePath}
                            alt=""
                        />
                    </Link>
                ) : (
                    <List>
                        <ListItem>
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </ListItem>
                    </List>
                )}
            </Right>
        </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: white;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  ${mobile({
      justifyContent: "flex-end",
    })}
`;

const Left = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
      display: "none",
      width: "0%"
    })}

  .navIcon {
    font-size: 20px;
    margin-right: 10px;
    color: #246866;
    cursor: pointer;
    }
`;

const Center = styled.div`
  width: 60%;

  ${mobile({
      marginRight: "10px",
      width: "90%"
    })}
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-right: 20px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  color: #246866;

  ${mobile({
      fontSize: "12px",
      marginRight: "10px"
    })}

  &:hover{
    color: #349491;
  }
`;

const Right = styled.div`
  /* width: 20%; */
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({
    
  })}

  .topImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
    cursor: pointer;
    }

    .topSearchIcon {
        font-size: 18px;
        color: #666;
        cursor: pointer;
    }
`;


export default Navbar