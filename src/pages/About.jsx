import styled from "styled-components";
import { mobile } from "../responsive";

const About = () => {
  return (
    <Container>
        <Wrapper>
            <Heading>
                <h1 className="title">ABOUT US</h1>
                <img src="./assets/coverTwo.jpg" alt="" className="coverImage" />
            </Heading>
            <Top>
                <div className="left">
                    <p>ipdcblog is a Professional Blog Platform. Here we will provide you only interesting content, which you will like very much. We're dedicated to
                        providing you the best of Blog, with a focus on dependability and blog for industrial park workers.
                    </p>
                    <p>We're working to turn our passion for Blog into a booming online website. We hope you enjoy our Blog as much as we enjoy offering them to you.
                    </p>
                    <p> Ipdcblog is free for all who wish to share.
                    </p>
                </div>
                <div className="right">
                    <img src="/assets/aboutPic.png" alt="" className="topImage" />
                </div>
            </Top>
            <Middle image={"assets/aboutPic2.jpg"}>
                <div className="left">
                    <Title>
                    <h1> <span>Daily Updates <br></br></span> Inside the park </h1>
                    <p>Share your experience of the Park and Beyond.</p>
                    </Title>
                </div>
                <div className="right">
                    <img src="/assets/icons.png" alt="" />
                </div>
            </Middle>
            <Bottom>
                <Image>
                    <img src="assets/1.png" alt=""/>
                </Image>
                <Image>
                    <img src="assets/b2.png" alt=""/>
                </Image>
                <Image>
                    <img src="assets/2.png" alt=""/>
                </Image>
                <Image>
                    <img src="assets/b4.png" alt=""/>
                </Image>
                <Image>
                    <img src="assets/b5.png" alt=""/>
                </Image>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

const Container = styled.div``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .title{
        font-size: 60px;
        position: absolute;
        color: #246866;
    }

    .coverImage{
        width: 100%;
        height: 30vh;
        top: 0;
        object-fit: cover;
    }
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 2%;
    height: 60vh;
    ${mobile({
        flexDirection: "column",
        height: "auto",
        margin: "10% 0"
    })}

    .left{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        ${mobile({
        width: "100%",
        })}

        p{
            width: 70%;
            font-size: 15px;
            font-weight: 500;
            margin-top: 5%;
            text-align: justify;
            color: #1c4b49;

            ${mobile({
                width: "90%",
            })}
        }
    }

    .right{
        width: 50%;
        display: flex;
        align-items: center;

        ${mobile({
        display: "none",
        })}
        .topImage{
            width: 50%;
            object-fit: contain;
        }
    }
`;

const Middle = styled.div`
  margin-top: 5%;
  color: white;
  background-image: url(${props => props.image});
  height: 90vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;

  ${mobile({
        flexDirection: "column",
        height: "auto",
        margin: "10% 0"
    })}

  .left{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;

    ${mobile({
        width: "100%",
        justifyContent: "space-around",
        padding: "0"
        })}
}

.right{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${mobile({
        display: "none",
        })}
    img{
        width: 40%;
    }
}
`;

const Title = styled.div`

        ${mobile({
            height: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        })}

  h1 {
      font-size: 80px;
      font-weight: 800;
      line-height: 80px;
      color: white;

      ${mobile({
        fontSize: "40px",
        lineHeight: "40px",
        textAlign: "center",
        width: "95%",
        margin: "20% 0"
        })}

      span{
        &:first-child{
            color: #0a1d1d;
        }
      }
    }

    p{
        margin-top: 10px;
        text-align: justify;

        ${mobile({
        width: "90%",
        fontSize: "13px",
        marginBottom: "15%",
        })}
    }
`;

const Bottom = styled.div`
    background: #F2F1ED;
    padding-top: 50px;
    padding-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 30px;
    max-width: 90%;
    margin: auto;
    margin-bottom: 10px;

    ${mobile({
        gridTemplateColumns: "repeat(2, 1fr)"
        })}
`;

const Image = styled.div`
height: 80%;
img {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    object-fit: contain;

    &:hover {
    transform: scale(1.1);
  }
  }
`;

export default About