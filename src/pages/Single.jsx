import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SinglePost from "../components/SinglePost";

const Single = ({ newsPost, posts, categoryList, isLoading, isCatLoading }) => {
  return (
    <Container>
        <SinglePost />
        <Sidebar newsPost={newsPost} posts={posts} categoryList={categoryList} isLoading={isLoading} isCatLoading={isCatLoading}/>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
`;

export default Single