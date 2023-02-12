import { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { mobile } from "../responsive";

const Contact = () => {
    const form = useRef();

      const alert = () => {
        confirmAlert({
          title: `Message Sent`,
          message: 'We have recieved your Message we will get back to you soon',
          buttons: [
            {
              label: 'Ok',
            }
          ]
        });
      }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
          .sendForm(
            "service_l08due8",
            "template_d133w5a",
            form.current,
            "xdWnW-wVAgQGOlj-v"
          )
          .then(
            (result) => {
              console.log(result.text);
              console.log("message sent");
              alert();
            },
            (error) => {
              console.log(error.text);
            }
          );
      };

  return (
    <Container>
        <Wrapper>
            <Heading>
                <h1 className="title">CONTACT US</h1>
                <img src="/assets/coverTwo.jpg" alt="" className="coverImage" />
            </Heading>
            <Top>
                <div className="left">
                    <div className="address">
                        <i className=" icon fa-solid fa-location-dot"></i>
                        <span className="title">Address</span>
                        <span className="detail">Addis Ababa, Ethiopia</span>
                        <span className="detail">Hawassa, Ethiopia</span>
                    </div>
                </div>
                <div className="center">
                    <div className="phoneNumber">
                        <i className=" icon fa-solid fa-phone"></i>
                        <span className="title">Phone Number</span>
                        <span className="detail">+251 9 00 00 00</span>
                        <span className="detail">+251 9 00 00 00</span>
                        <span className="detail">+251 9 00 00 00</span>
                    </div>
                </div>
                <div className="right">
                    <div className="email">
                        <i className=" icon fa-solid fa-envelope"></i>
                        <span className="title">Email</span>
                        <span className="detail">info@ipdcblogs.com</span>
                        <span className="detail">info@ipdcblogs.com</span>
                        <span className="detail">info@ipdcblogs.com</span>
                    </div>
                </div>
            </Top>
            <Bottom>
                <div className="left">
                    <span className="title">Message Us</span>
                    <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste non sapiente asperiores ab veniam eveniet vel.
                    Distinctio voluptatibus, est officiis sequi voluptatem quae, a aspernatur qui voluptate reiciendis labore tempora?
                    </p>
                </div>
                <div className="right">
                    <div className="contactForm">
                        <form ref={form} onSubmit={sendEmail}>
                            <label>Name</label>
                            <input type="text" name="user_name" />
                            <label>Email</label>
                            <input type="email" name="user_email" />
                            <label>Message</label>
                            <textarea name="message" />
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

const Container = styled.div``;

const Wrapper = styled.div``;

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    .title{
        font-size: 60px;
        position: absolute;
        color: #246866;

        ${mobile({
            textAlign: "center"
        })}
    }

    .coverImage{
        width: 100%;
        height: 30vh;
        top: 0;
        object-fit: cover;
    }
`;

const Top = styled.div`
    height: 40vh;
    margin-top: 5%;
    padding: 10px;
    display: flex;
    justify-content: space-around;

    ${mobile({
        flexDirection: "column",
        height: "auto",
    })}

    .address, .phoneNumber, .email{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .icon{
        margin-top: 10px;
        font-size: 2.5rem;
        color: #1e5553;
    }

    .title{
        margin-top: 20px;
        font-size: 1.3rem;
        font-weight: bold;
    }

    .detail{
        margin-top: 10px;
        font-size: 1.2rem;
    }
`;

const Bottom = styled.div`
    height: 60vh;
    display: flex;
    justify-content: space-around;
    margin-top: 5%;
    background-color: #f1efef;
    padding: 10px;

    ${mobile({
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        margin: "10% 0"
        })}

    .left{
        width: 40%;
        margin-left: 5%;

        ${mobile({
        width: "95%"
        })}

        .title{
            font-size: 2.5rem;
            font-weight: bold;
            color: #246462;
        }

        .desc{
            width: 90%;
            margin-top: 5%;
            font-size: 13px;
            font-weight: 400;
            color: #747474;
        }
    }

    .right{
        width: 60%;

        ${mobile({
        width: "95%"
        })}

        .contactForm{
            width: 80%;

            ${mobile({
                width: "100%"
            })}

            form {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                width: 80%;
                font-size: 16px;
                font-weight: 500;

                ${mobile({
                    width: "90%"
                })}

                input {
                width: 100%;
                height: 35px;
                padding: 7px;
                outline: none;
                border-radius: 5px;
                border: 1px solid #246462;

                

                &:focus {
                    border: 2px solid #81f0d2;
                }
                }
                textarea {
                max-width: 100%;
                min-width: 100%;
                width: 100%;
                max-height: 100px;
                min-height: 100px;
                padding: 7px;
                outline: none;
                border-radius: 5px;
                border: 1px solid #246462;
                resize: none;
                &:focus {
                    border: 2px solid rgba(0, 206, 158, 1);
                }
                }
                label {
                margin-top: 1rem;
                }
                input[type="submit"] {
                margin-top: 2rem;
                cursor: pointer;
                background: #1e5553;
                color: white;
                border: none;
                }
            }
        }
    }
`;

export default Contact