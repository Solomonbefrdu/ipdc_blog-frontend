import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { format } from "timeago.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { logoutSuccess } from "../Redux/authRedux";
import axios from "axios";

const Settings = () => {
  const currentUser = useSelector((state) => state?.user.currentUser);
  const user = currentUser.data;
  const token = currentUser.token;
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await axios.delete(`https://ipdbblog.onrender.com/api/users/${user._id}`,{
        headers: {
            Authorization: `Bearer ${token}` 
          },
          data: {
            userId: user._id,
          },
        });
      dispatch(logoutSuccess())
    } catch (err) {}
  };

  const submit = (post) => {
    confirmAlert({
      title: `Delete Profile`,
      message: 'Are you sure you want to delete your profile?',
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
  };

  return (
    <Container>
        <Wrapper>
            <Title>
                <span className="settingsTitleUpdate">Your Account</span>
                <span
                className="settingsTitleDelete"
                onClick={()=>submit(user)}
                >Delete Account</span>
            </Title>
        <UserInfo>
            <div className="left">
              <img src={user.picturePath} alt="" />
            </div>
            <div className="right">
              <div className="detail">
                <span className="title">Full Name:</span>
                <span className="desc">{` ${user.firstName} ${user.lastName}`}</span>
              </div>
              <div className="detail">
                <span className="title">Location:</span>
                <span className="desc">{user.location}</span>
              </div>
              <div className="detail">
                <span className="title">Occupation:</span>
                <span className="desc">{user.occupation}</span>
              </div>
              <div className="detail">
                <span className="title">Email:</span>
                <span className="desc">{user.email}</span>
              </div>
              <div className="detail">
                <span className="title">Profile Created:</span>
                <span className="desc">{format(user.createdAt)}</span>
              </div>
            </div>
        </UserInfo>
        </Wrapper>
        {/* <Sidebar /> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 75%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .settingsTitleUpdate {
    font-size: 30px;
    margin-bottom: 20px;
    color: #246866;
    }

    .settingsTitleDelete {
      color: red;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }
`;

const UserInfo = styled.div`
  display: flex;
  .left{
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 60%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
  .right{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .detail{
      margin-top: 5%;
      display: flex;
      align-items: center;

      .title{
        font-size: 12px;
        font-weight: 500;
        margin-right: 5px;
      }

      .desc{
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;


export default Settings