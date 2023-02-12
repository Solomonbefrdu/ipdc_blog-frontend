import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Home = ({ newsPost, categoryList, isCatLoading }) => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [ isLoading, setIsLoading ] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try{
        const res = await publicRequest.get("api/posts" + search);
        setPosts(res.data);
        setCurrentPage(1);
      } catch (error){
        console.log(error)
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [search]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.length <=6 ? posts : posts.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      <Container>
        <div className="wrapper" ref={scrollRef}>
          <Posts posts={currentPosts} isLoading={isLoading}/>
        </div>
          <Sidebar newsPost={newsPost}
                    posts={posts}
                    categoryList={categoryList}
                    isLoading={isLoading}
                    isCatLoading={isCatLoading}
                    setCurrentPage={setCurrentPage}
                  />
      </Container>
      <Pagination 
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        scrollRef={scrollRef}
      />
    </>
  )
}

const  Container = styled.div`
    display: flex;

    .wrapper{
      width: 75%;

      ${mobile({
          width: "100%",
        })}
    }
`;

export default Home