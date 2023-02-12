import styled from "styled-components";
import { mobile } from "../responsive";
import Post from "./Post";
import Skeleton from "./Skeleton";

const Posts = ({ posts, isLoading }) => {
  
  return (
    <Container>
      { isLoading ? ( <Skeleton type="feed"/> ) : 
        (
        posts?.map((post) => (
          <Post post={post} key={post._id}/>
          ))
        )
      }
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 20px;

    ${mobile({
        flexWrap: "no-wrap",
        margin: "5% 0",
        alignItems: "center",
        justifyContent: "center"
    })}
`;

export default Posts