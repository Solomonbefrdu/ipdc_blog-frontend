import styled from "styled-components";
import * as yup from "yup";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { login } from "../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required")
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.user.isFetching);
  const isError = useSelector((state) => state.user.error);

  const userLogin = async(values, onSubmitProps) => {
    login(dispatch, {email: values.email,
                     password: values.password 
                    })
  }
  
  const handleFormSubmit = async(values, onSubmitProps) => {
    await userLogin(values, onSubmitProps);
  }
  return (
    <Container image={"/assets/register.jpg"}>
        <span className="loginTitle">LOGIN</span>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues= {initialValuesLogin}
          validationSchema= {loginSchema}
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
               onSubmit={handleSubmit}
              >
              <TextField 
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={ Boolean(touched.email) && Boolean(errors.email)}
                helperText={ touched.email && errors.email }
                sx={{ gridColumn: "span 4",
                      marginBottom: "10px",
                      bgcolor: "white",
                    }}
                inputProps={{ style: { fontFamily: "Josefin Sans, sans-serif" }}}
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
                  sx={{ gridColumn: "span 4",
                        bgcolor: "white" }}
              />
              <button type="submit" className="loginButton">Login</button>
          </Form>
            )}
        </Formik>
        {
          isFetching && <span style={{ marginTop: "5px" }}>Logging In...</span>
        }
        {
          isError && <span style={{ fontSize: "14px", color: "red" }}>Something went wrong try again</span>
        }
        <span className="register">Don't have an account? <Link className="link" to="/register">Register</Link></span>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(147, 204, 187, 0.8),
      rgba(255, 255, 255, 0.5)
    ),
    url(${props => props.image});
    background-size: cover;

  .loginTitle {
  font-size: 50px;
    }

.register{
  font-size: 12px;
  margin-top: 10px;

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

.loginButton {
  margin-top: 20px;
  cursor: pointer;
  background-color: #246866;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
}
`;

export default Login