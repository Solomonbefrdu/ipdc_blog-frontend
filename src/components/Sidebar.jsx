import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Highlighter from "react-highlight-words";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";
import { mobile } from "../responsive";

const Sidebar = ({ newsPost, posts, categoryList, isLoading, isCatLoading, setCurrentPage }) => {
    const [query, setQuery] = useState("");
    const keys = ["title", "firstName", "lastName"];
    const newsPosts = newsPost?.filter(post => post.categories.includes("News"))

    const search = (data) => {
        if(query.length > 2){
            return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
            );
        }
    };

  const searchResult = search(posts);

  return (
    <Container>
        <Search>
            <div className="searchInput">
                <input
                type="text"
                className="input"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                <i className="topSearchIcon fas fa-search"></i>
            </div>
            <div className="searchResult">
                { query &&
                <p>search result</p>
                 }
                {
                searchResult?.slice(0, 5).map((result) => (
                    <div className="resultContainer" key={result._id}>
                        <Link to={`/post/${result._id}`} onClick={()=>setCurrentPage(1)} className="link">
                            <span className="title">
                            <Highlighter
                                highlightClassName="resultTitle"
                                searchWords={[query]}
                                textToHighlight={result.title}
                                highlightStyle={{ backgroundColor: "#389e9b", color: "white" }}
                                />
                            </span>
                        </Link>
                        <span className="author">By {`${result.firstName} ${result.lastName}`}</span>
                    </div>
                ))}
            </div>
        </Search>
        <Item>
            <span className="sidebarTitle">CATEGORIES</span>
            {
                isCatLoading ? <Skeleton type="catList" /> :    
                <List>
                    {
                    categoryList.map((category) => (
                    <ListItem key={category._id}>
                        <Link className="link" to={`/?cat=${category.name}`}>
                            {category.name}
                        </Link>
                    </ListItem>
                    )) }
                </List>
            }
        </Item>
        <News>
            <span className="sidebarTitle">RECENT NEWS</span>
            {
                isLoading ? <Skeleton type="news" /> 
                :
                <div className="newsWrapper">
                {
                    newsPosts?.splice(0, 9).map((news) => (  
                    <div key={news._id} className="newsContainer">
                    <Link to={`/post/${news._id}`} className="link">
                    <span className="newsTitle">{news.title}</span>
                    </Link>
                    <span className="newsAuthor">{`By ${news.firstName} ${news.lastName}`}</span>
                    <span className="newsTime">{format(news.createdAt)}</span>
                    </div>
                    ))}
                </div> 
            }
        </News>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 25%;
  height: fit-content;
  margin: 20px;
  padding-bottom: 30px;
  background-color: #fdfbfb;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile({
        display: "none"
    })}
`;

const Search = styled.div`
    width: 90%;
    z-index: 5;
    position: absolute;
    .searchInput{
        display: flex;
        align-items: center;
        border: 2px solid gray;
        border-radius: 10px;
        padding: 10px;

        .input{
            width: 90%;
            border: none;

            &:focus{
                outline: none;
            }
        }
    }

    .searchResult{
        background-color: #f0ebeb;
        display: flex;
        flex-direction: column;
        border-radius: 5px;

        p{
            font-size: 12px;
            color: gray;
            margin: 5px  0 5px 10px;
        }

        .resultContainer{
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            padding: 5px;

            .title{
                font-size: 21px;
                font-weight: 500;
            }

            .author{
                font-size: 13px;
            }
        }
    }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;

  .sidebarTitle {
    margin: 10px;
    padding: 5px;
    width: 80%;
    text-align: center;
    font-family: "Varela Round", sans-serif;
    font-size: 15px;
    color: #246866;
    font-weight: 600;
    }
`;

const List = styled.ul`
  list-style-type: none;
  margin-bottom: 30px;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 50%;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover{
    color: #246866;
  }
`;

const News = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
  .sidebarTitle {
    margin: 10px;
    padding: 5px;
    width: 80%;
    text-align: center;
    font-family: "Varela Round", sans-serif;
    font-size: 15px;
    color: #246866;
    font-weight: 600;
    text-align: center;
    }

    .newsWrapper{
        display: flex;
        flex-direction: column;

        .newsContainer{
            display: flex;
            flex-direction: column;
            margin-bottom: 5px;

            .newsTitle{
                font-size: 22px;
                color: #163a39;
                font-weight: 900;
                margin-top: 15px;
                cursor: pointer;

                &:hover{
                   color: #246866;
                }
            }

            .newsAuthor{
                font-size: 15px;
                font-weight: 500;
            }

            .newsTime{
                font-family: "Lora", serif;
                font-style: italic;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
            }
        }
    }
`;

export default Sidebar