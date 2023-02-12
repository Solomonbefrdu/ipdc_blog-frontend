import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mobile } from "../responsive";

const Write = ({ categoryList }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ categories, setCategories ] = useState([]);
  const [file, setFile] = useState(null);
  const [ isPublishing, setIsPublishing ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const user = useSelector((state) => state?.user.currentUser);
  const token = user.token;
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const addOrRemove = (name) => {
    const newCategories = [...categories];
    const index = newCategories.indexOf(name);
    if (index === -1) {
      newCategories.push(name);
    } else {
      newCategories.splice(index, 1);
    }
    setCategories(newCategories);
}

  const handleSubmit = async (e) => {
    setIsPublishing(true);
    try {
    e.preventDefault();
    if(file){
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
          case 'paused':
              console.log('Upload is paused');
              break;
              case 'running':
              console.log('Upload is running');
              break;
              default: 
              console.log("default")
              break;
          }
      }, 
      (error) => {
          console.log(error);
      }, 
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              const postBody = {
                  userId: user.data._id,
                  title: title,
                  description: desc,
                  categories: categories,
                  picturePath: downloadURL
              };
              await axios.post(`https://ipdbblog.onrender.com/api/posts`,
              postBody,
              config
              );
              navigate("/");
          })
      })
  } else {
      const postBody = {
        userId: user.data._id,
        title: title,
        description: desc,
        categories: categories,
      };
      await axios.post(`https://ipdbblog.onrender.com/api/posts`,
      postBody,
      config
      );
      navigate("/");
  }
  } catch (error) {
    setIsError(true);
    console.log(error);    
  }
  setIsPublishing(false);
  }



  return (
    <Container>
      <Message>
        { isPublishing &&
          <span className="publishingMessage">Publishing Your Blog...</span>
         }
         { isError &&
          <span className="errorMessage">Error occured While publishing your post please reload and try again...</span>
          }
      </Message>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
            <label htmlFor="fileInput">
                <i className="writeIcon fas fa-image"></i>
            </label>
            <input 
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              />
            <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                onChange={e=>setTitle(e.target.value)}
            />
        </FormGroup>
        <Category>
          <span className="categoryTitle">Choose one or more Category that Suits your Blog</span>
          <div className="categoryWrapper">
              {
                categoryList.map((category) => (
                  <div key={category._id} className="categoryContainer">
                    <input
                        type="checkbox"
                        id={category.name}
                        name={category.name}
                        className="categorySelect"
                        onClick={() => addOrRemove(category.name)}
                        />
                    <label className="categoryLable" htmlFor={category.name}>{category.name}</label>
                </div>
              ))}
          </div>
        </Category>
        <FormGroup>
            <textarea
                className="writeInput writeText"
                placeholder="Tell your story..."
                type="text"
                autoFocus={true}
                onChange={e=>setDesc(e.target.value)}
            />
        </FormGroup>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 50px;

  .writeImg {
    margin-left: 150px;
    width: 70vw;
    height: 250px;
    border-radius: 10px;
    object-fit: cover;
}
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;

  span{
    font-size: 15px;
    font-weight: bold;
  }
  .publishingMessage{
      color: #096969;
    }

    .errorMessage{
      color: red;
    }
`;

const Form = styled.form`
  position: relative;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  })}

  .writeSubmit {
    position: absolute;
    top: 20px;
    right: 50px;
    color: white;
    background-color: teal;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;

    ${mobile({
      top: "10px"
  })}
}
`;

const FormGroup = styled.div`
  margin-left: 150px;
  display: flex;
  align-items: center;

  ${mobile({
    marginLeft: "0",
    marginTop: "10%"
  })}

  .writeIcon {
    width: 25px;
    height: 25px;
    font-size: 20px;
    border-radius: 50%;
    color: rgb(22, 83, 55);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.writeInput {
  font-size: 30px;
  border: none;
  padding: 20px;
  width: 70vw;

  &::placeholder{
    color: rgb(189, 185, 185);
    font-weight: 400;
  }

  &:focus{
    outline-style: none;
  }
}

.writeText {
  width: 70vw;
  height: 100vh;
  font-family: inherit;
  font-size: 20px;
  resize: none;

  ${mobile({
    width: "100%"
  })}
}
`;

const Category = styled.div`
  margin-left: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({
    width: "100%",
    marginLeft: "0"
  })}

  .categoryTitle{
    font-size: 12px;
    font-weight: 500;
    color: gray;
    margin-bottom: 10px;
  }

  .categoryWrapper{
    width: 90%;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    border: 1px solid #cac7c7;

      ${mobile({
      width: "95%",
      padding: "5px"
    })}

    .categoryContainer{
      display: flex;
      margin-left: 10px;
      margin-bottom: 10px;

      .categorySelect{
        margin-right: 5px;
        cursor: pointer;
      }

      .categoryLable{
        color: gray;
        cursor: pointer;
      }
    }
  }
`;

export default Write