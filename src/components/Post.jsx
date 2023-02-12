import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { mobile } from "../responsive";

const Post = ({ post }) => {
  return (
    <Container>
      <div className="blogger">
          <div className="profile">
            <img src={post.userPicturePath} alt="" />
          </div>
          <div className="bloggerDetail">
            <Link className="link" to={`/?userId=${post.userId}`}>
                <span className="fullname">{`${post.firstName} ${post.lastName}`}</span>
            </Link>
            <span className="location">{post.location}</span>
          </div>
      </div>
      { post?.picturePath &&  
        <img
        className="postImg"
        src={post.picturePath}
        alt=""
        />
      }
        <PostInfo>
            <PostCats>
              { post.categories.map((category) =>(
                <span key={category} className="postCat">
                    <Link className="link" to={`/?cat=${category}`}>
                      {category}
                    </Link>
                </span>
                  ))}
            </PostCats>
            <span className="postTitle">
                <Link to={`/post/${post._id}`} className="link">
                  {post.title}
                </Link>
            </span>
            <hr></hr>
            <span className="postDate">{format(post.createdAt)}</span>
        </PostInfo>
        <p className="postDesc">{post.description}</p>
    </Container>
  )
}

const Container = styled.div`
  padding: 5px;
  height: fit-content;
  width: 42%;
  margin: 0px 25px 40px 25px;
  display: flex;
  flex-direction: column;
  background-color: #e8f1f1ae;

  ${mobile({
      width: "90%",
      margin: "10px 0",
    })}

  .blogger{
    display: flex;
    align-items: center;
    padding: 5%;

    .profile{
      img{
        height: 55px;
        width: 55px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .bloggerDetail{
      display: flex;
      flex-direction: column;
      margin-left: 5%;

      .fullname{
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        &:hover{
          color: #246866;
        }
      }

      .location{
        font-size: 12px;
      }
    }
  }

  .postImg {
    width: 95%;
    height: 220px;
    object-fit: cover;
    border-radius: 7px;
    align-self: center;
    }

  .postDesc {
    font-family: "Varela Round", Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #444444;
    margin: 15px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    ${mobile({
      fontSize: "12px"
    })}
    }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .postTitle {
  font-family: "Josefin Sans", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 900;
  margin-top: 15px;
  cursor: pointer;
  text-align: center;

  ${mobile({
      fontSize: "18px"
    })}

  &:hover{
    color: #246866;
  }
  }

.postDate {
  font-family: "Lora", serif;
  font-style: italic;
  font-size: 13px;
  font-weight: 400;
  color: #999999;
  margin-top: 15px;
 }
`;

const PostCats = styled.div`
  width: 90%;
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
    .postCat {
    font-family: "Varela Round", Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #be9656;
    line-height: 15px;
    margin-top: 10px;
    margin-right: 5px;
    cursor: pointer;
    }
`;

export default Post