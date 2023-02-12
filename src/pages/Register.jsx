import styled from "styled-components";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, TextField, Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import app from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mobile } from "../responsive";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const Register = () => {
    const [ isError, setIsError ] = useState(false);

    const userRegister = async(values, onSubmitProps) => {
        try {
            const fileName = new Date().getTime() + values.picture?.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, values.picture);
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
                const formBody = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    location: values.location,
                    occupation: values.occupation,
                    picturePath: downloadURL,
                    email: values.email,
                    password: values.password,
                }
                await axios.post(`https://ipdbblog.onrender.com/api/auth/register`,
                formBody
                ).then(()=>{
                    onSubmitProps.resetForm();
                    window.location.replace("/login");
                })
                })
            })
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
    }


    const handleFormSubmit = async(values, onSubmitProps) => {
        await userRegister(values, onSubmitProps);
    }


  return (
   <Container image={"/assets/register.jpg"}>
        <span className="registerTitle">REGISTER</span>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <Form
            onSubmit={ handleSubmit}
            >
                    <TextField 
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={ Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={ touched.firstName && errors.firstName }
                        sx={{ bgcolor: "white", gridColumn: "span 2", marginBottom: "10px" }}
                    />
                    <TextField 
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={ Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={ touched.lastName && errors.lastName }
                        sx={{ bgcolor: "white", gridColumn: "span 2", marginBottom: "10px" }}
                    />
                    <TextField 
                        label="Location"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={ Boolean(touched.location) && Boolean(errors.location)}
                        helperText={ touched.location && errors.location }
                        sx={{ bgcolor: "white", gridColumn: "span 4", marginBottom: "10px" }}
                    />
                    <TextField 
                        label="Occupation"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={ Boolean(touched.occupation) && Boolean(errors.occupation)}
                        helperText={ touched.occupation && errors.occupation }
                        sx={{ bgcolor: "white", gridColumn: "span 4", marginBottom: "10px" }}
                    />
                    <Box
                        gridColumn="span 4"
                        border={ `1px solid black`}
                        borderRadius="5px"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles = ".jgp,.jpeg,.png"
                            multiple={false}
                            onDrop = {(acceptedFiles) => 
                            setFieldValue("picture", acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps })=> (
                                <Box 
                                    { ...getRootProps()}
                                    border={`2px dashed gray`}
                                    p="1rem"
                                    sx={{ "&:hover" : { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <p>AddPicture Here</p>
                                    ) : (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Typography>{values.picture.name}</Typography>
                                            <i className="fas fa-edit"></i>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Dropzone>
                    </Box>
                    <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={ Boolean(touched.email) && Boolean(errors.email)}
                            helperText={ touched.email && errors.email }
                            sx={{ bgcolor: "white", gridColumn: "span 4", margin: "10px 0 10px 0"}}
                        />
                        <TextField 
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={ Boolean(touched.password) && Boolean(errors.password)}
                            helperText={ touched.password && errors.password }
                            sx={{ bgcolor: "white", gridColumn: "span 4" }}
                        />
                <button type="submit" className="registerButton">REGISTER</button>
            </Form>
        )}
        </Formik>
        {
            isError && <span style={{ marginTop: "5px", fontWeight: "500", color: "red" }} >Error Registering, Try again</span>
        }
        <span className="login">Already have an account? <Link className="link" to="/login">Login</Link></span>
   </Container>
  )
}

const Container = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(147, 204, 187, 0.9),
      rgba(255, 255, 255, 0.5)
    ),
    url(${props => props.image});
  background-size: cover;


    .registerTitle {
        font-size: 50px;
        margin-top: 5%;
    }

    .login{
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 5%;

  .link{
    color: #185c5c;
    font-size: 13px;
    font-weight: bold;
  }
}
`;

const Form = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 400px;

    ${mobile({
        width: "95%"
    })}

    .registerButton {
        margin-top: 20px;
        cursor: pointer;
        background-color: teal;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 10px;
        text-align: center;
    }
`;

export default Register