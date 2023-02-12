import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { format } from "timeago.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
import Skeleton from "./Skeleton";
import { mobile } from "../responsive";

const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        if(currentUser){
            setUser(currentUser.data)
            setToken(currentUser.token)
        }
    },[currentUser])
    console.log({ user: user, token: token })
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(()=> {
        const getPost = async () => {
            setIsLoading(true);
            try {
                const res = await publicRequest.get("/api/posts/" + path);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.description);
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        };
        getPost();
    }, [path]);

    const handleUpdate = async () => {
        try {
          await axios.put(`https://ipdbblog.onrender.com/api/posts/${post._id}`, {
            userId: user._id,
            title,
            description: desc,
          },
          config,
          );
          setUpdateMode(false)
        } catch (err) {}
    };

    const handleDelete = async () => {
        try {
          await axios.delete(`https://ipdbblog.onrender.com/api/posts/${post._id}`,{
            headers: {
                Authorization: `Bearer ${token}` 
              },
              data: {
                userId: user._id,
              },
            }
          );
          window.location.replace("/");
        } catch (err) {}
    };

    const submit = (post) => {
        confirmAlert({
          title: `Delete ${post.title}`,
          message: 'Are you sure you want to delete this Blog?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => handleDelete()
            },
            {
              label: 'No',
            }
          ]
        });
      }

  return (
    <Container>
        {
            isLoading ? <Skeleton type="single"/> 
            :
        <Wrapper>
            { post.picturePath &&
                <img
                className="singlePostImg"
                src= {post.picturePath}
                alt=""
                />
            }
            { updateMode ? (
                <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
            />
            ) : (
                <h1 className="singlePostTitle">
                    {title}
                    { post.userId === user?._id && (
                        <PostEdit>
                            <i className="singlePostIcon far fa-edit"
                                onClick={() => setUpdateMode(true)}
                            ></i>
                            <i className="singlePostIcon far fa-trash-alt"
                                onClick={()=>submit(post)}
                            ></i>
                        </PostEdit>
                    )} 
            </h1>
                )}
            <PostInfo>
                <span>
                    Author:
                    <b className="singlePostAuthor">
                    <Link className="link" to={`/?userId=${post.userId}`}>
                        {`${post.firstName} ${post.lastName}`}
                    </Link>
                    </b>
                </span>
                <span>{format(post.createdAt)}</span>
            </PostInfo>
            {updateMode ? (
                <textarea
                    className="singlePostDescInput"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            ) : (
                <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
            )}
        </Wrapper>
        }
    </Container>
  )
}

const Container = styled.div`
    width: 75%;
    margin-top: 5%;

    ${mobile({
        width: "100%",
        display: "flex",
        justifyContent: "center",
    })}
`;

const Wrapper = styled.div`
  padding: 20px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  align-self: center;

    ${mobile({
        padding: "0",
        alignItems: "center",
        width: "95%"
    })}

  .singlePostImg {
    width: 100%;
    height: 300px;
    border-radius: 5px;
    object-fit: cover;
    }

    .singlePostTitle {
    text-align: center;
    margin: 10px;
    font-size: 28px;
    font-family: 'Josefin Sans', sans-serif;
    }

    .singlePostTitleInput {
    margin: 10px;
    font-family: "Lora", serif;
    font-size: 28px;
    text-align: center;
    border: none;
    color: gray;
    border-bottom: 1px solid lightgray;

    &:focus{
        outline: none;
    }
    }

    .singlePostDescInput {
    border: none;
    width: 95%;
    height: 60vh;
    color: #666;
    font-size: 18px;
    line-height: 25px;
    background-color: #f0f0f0;
    resize: none;

    &:focus{
        outline: none;
    }
    }

    .singlePostDesc {
    width: 95%;
    margin-bottom: 5%;
    color: #666;
    font-size: 18px;
    line-height: 25px;
    white-space: pre-wrap;
    font-family: 'Josefin Sans', sans-serif;
    text-align: justify;

    &::first-letter{
        margin-left: 20px;
        font-size: 30px;
        font-weight: 600;
    }
    }

    .singlePostButton {
    width: 100px;
    border: none;
    background-color: teal;
    padding: 5px;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end;
    margin-top: 20px;
    }
`;

const PostEdit = styled.div`
  float: right;
  font-size: 16px;

  .singlePostIcon {
    margin-left: 10px;
    cursor: pointer;

    &:first-child{
        color: teal;
    }

    &:last-child{
        color: tomato;
    }
   }
`;

const PostInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: #be9656;
  font-family: "Varela Round", Arial, Helvetica, sans-serif;

  .singlePostAuthor{
    margin-left: 5px;
    }
`;

export default SinglePost