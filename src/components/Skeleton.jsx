import styled from "styled-components";
import { mobile } from "../responsive";

const Skeleton = ({ type }) => {
    const COUNTER = 6;
    const CATLIST = 32;

    const PostSkeleton = () => (
        <PostSkeletonContainer>
            <div className="bloggerInfo">
                <div className="profile"></div>
                <div className="bloggerDetail">
                    <div className="name"></div>
                    <div className="location"></div>
                </div>
            </div>
            <div className="postSkImg"></div>
            <div className="postSkInfo">
                    <div className="postSkTitle"></div>
                    <div className="postSkDate"></div>
                    <div className="postSkDesc"></div>
            </div>
        </PostSkeletonContainer>
    )

    const SinglePostSkeleton = () => (
        <SinglePostSkeletonContainer>
            <div className="singlePostSkImg"></div>
            <div className="singlePostSkTitle"></div>
            <div className="singlePostInfo">
                <div className="author"></div>
                <div className="text"></div>
            </div>
            <div className="singlePostSkDesc"></div>
            <div className="singlePostSkDesc"></div>
            <div className="singlePostSkDesc"></div>
        </SinglePostSkeletonContainer>
    )

    const CategoryListSkeleton = () => (
        <CategoryListSkeletonContainer>
            {
                Array(CATLIST).fill(<div className="listItemSk"></div>)
            }
        </CategoryListSkeletonContainer>
    )

    const NewsListSkeleton = () => (
        <NewsListSkeletonContainer>
            <div className="newsContainer">
                <div className="title"></div>
                <div className="title second"></div>
                <div className="author"></div>
                <div className="time"></div>
            </div>
        </NewsListSkeletonContainer>
    )

    if(type === "feed") return Array(COUNTER).fill(<PostSkeleton />);
    else if(type === "single") return <SinglePostSkeleton />;
    else if(type === "catList") return <CategoryListSkeleton />;
    else  if(type === "news") return Array(COUNTER).fill(<NewsListSkeleton />);
}

const PostSkeletonContainer = styled.div`
  padding: 5px;
  height: fit-content;
  width: 42%;
  margin: 0px 25px 40px 25px;
  display: flex;
  flex-direction: column;
  background-color: #d5ddddad;
  animation: skeleton 1s ease infinite alternate;

  ${mobile({
      width: "90%",
      margin: "10px 0",
    })}


  @keyframes skeleton {
    to{
        opacity: 0.5;
    }
  }

  .bloggerInfo{
    display: flex;
    align-items: center;
    padding: 5%;

    .profile{
        height: 55px;
        width: 55px;
        border-radius: 50%;
        object-fit: cover;
        background-color: #b1b8b8;
    }

    .bloggerDetail{
        display: flex;
        flex-direction: column;
        margin-left: 5%;
        width: 90%;

        .name{
            width: 80%;
            height: 20px;
            background-color: #b1b8b8;
        }

        .location{
            margin-top: 5px;
            width: 60%;
            height: 10px;
            background-color: #b1b8b8; 
        }
    }
  }

  .postSkImg{
    width: 95%;
    height: 220px;
    background-color: #b1b8b8;
    border-radius: 7px;
    align-self: center;
  }

  .postSkInfo{
    width: 95%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .postSkTitle{
        width: 90%;
        height: 25px;
        background-color: #b1b8b8;

        ${mobile({
            height: "20px"
        })}
    }

    .postSkDate{
        width: 30%;
        height: 10px;
        background-color: #b1b8b8;
        margin-top: 15px;
    }

    .postSkDesc{
        margin-top: 15px;
        background-color: #b1b8b8;
        width: 100%;
        height: 70px;

        ${mobile({
            height: "50px"
        })}
    }
  }
`;

const SinglePostSkeletonContainer = styled.div`
  padding: 20px;
  margin: 5% 0;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  animation: skeleton 1s ease infinite alternate;

  ${mobile({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0"
    })}

  @keyframes skeleton {
    to{
        opacity: 0.5;
    }
  }

  .singlePostSkImg{
    width: 100%;
    height: 300px;
    border-radius: 5px;
    background-color: #b1b8b8;

    ${mobile({
        width: "95%"
    })}
  }

  .singlePostSkTitle {
    margin: 10px;
    width: 80%;
    height: 30px;
    justify-self: center;
    background-color: #b1b8b8;
    }

    .singlePostInfo{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    ${mobile({
        width: "95%",
    })}
        .author{
            margin-left: 5px;
            height: 15px;
            width: 30%;
            background-color: #b1b8b8;
        }

        .text{
            margin-right: 5px;
            height: 15px;
            width: 20%;
            background-color: #b1b8b8;
        }
    }

    .singlePostSkDesc{
        margin-top: 20px;
        width: 100%;
        height: 20px;
        background-color: #b1b8b8;

        ${mobile({
        width: "95%",
    })}

        &:last-child{
            width: 80%;
        }
    }
`;

const CategoryListSkeletonContainer = styled.div`
    margin-bottom: 30px;
    height: 50vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    animation: skeleton 1s ease infinite alternate;

    @keyframes skeleton {
        to{
            opacity: 0.5;
        }
    }

    .listItemSk{
        width: 70%;
        margin-top: 10px;
        margin-right: 40%;
        height: 12px;
        background-color: #b1b8b8;
    }
`;

const NewsListSkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    animation: skeleton 1s ease infinite alternate;

    @keyframes skeleton {
    to{
        opacity: 0.5;
    }
    }

        .newsContainer{
            display: flex;
            flex-direction: column;
            margin-bottom: 25px;
            .title{
                width: 90%;
                height: 25px;
                background-color: #b1b8b8;
                margin-bottom: 5px;
            }

            .second{
                width: 80%;
            }
            
            .author{
                width: 60%;
                height: 20px;
                background-color: #b1b8b8;
                margin-bottom: 5px;
            }
            
            .time{
                width: 40%;
                height: 13px;
                background-color: #b1b8b8;
            }
        }
`;

export default Skeleton