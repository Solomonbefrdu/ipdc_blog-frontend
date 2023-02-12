import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Single from "./pages/Single";
import Write from "./pages/Write";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "./requestMethods";
import NotFound from "./components/NotFound";

const App = () => {
  const currentUser = useSelector((state) => state?.user.currentUser);
  const [posts, setPosts] = useState([]);
  const [ categoryList, setCategorList ] = useState([]);
  const [ newsPost, setNewsPost ] = useState([]);
  const [ isCatLoading, setIsCatLoading ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try{
      const res = await publicRequest.get("api/posts");
      setPosts(res.data);
      setNewsPost(res.data);
      } catch(error){
        console.log(error)
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCatLoading(true);
      try{
        const res = await publicRequest.get("api/categories");
        setCategorList(res.data);
      } catch(error){
        console.log(error)
      }
      setIsCatLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <Home  newsPost={newsPost} categoryList={categoryList} isCatLoading={isCatLoading}/> } />
          <Route  path="/write" element={ currentUser ? <Write categoryList={categoryList}/> : <Navigate to="/login"/> } />
          <Route  path="/settings" element={ currentUser ? <Settings /> : <Navigate to="/login"/> } />
          <Route  path="/about" element={  <About /> } />
          <Route  path="/contact" element={ <Contact /> } />
          <Route  path="/login" element={ currentUser ? <Navigate to="/"/> : <Login /> } />
          <Route  path="/register" element={ currentUser ? <Navigate to="/"/> : <Register /> } />
          <Route path="/post/:postId" element={<Single newsPost={newsPost} posts={posts} categoryList={categoryList} isLoading={isLoading} isCatLoading={isCatLoading}/>} />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
        <Footer />
    </div>
  )
}

export default App