import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ handleChange, handleSignIn }) => {
  const paperStyle = {
    margin: "0 auto",
    width: 300,
    padding: "30px 20px",
  };
  const avatarStyle = { backgroundColor: "green" };
  const linkTypography = { textAlign: "left", marginTop: 5 };

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const onSubmitHandler = (values, props) => {
    // console.log(props); // when we see resetform, isSubmitting etc checked props
    console.log(values);

    // handleSignIn(values)

    // for reset form
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(handleSignIn(values)); // used when click on button than disabled
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("please enter valid email")
      .required("email Required"),
    password: Yup.string().required("password Required"),
  });

  return (
    <>
      <Grid>
        <Paper elevation="10" style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign in</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmitHandler}
            >
              {(props) => (
                <Form>
                  {/* {console.log(props)} */}

                  <Field
                    as={TextField}
                    id="standard-basic"
                    label="Email *"
                    name="email"
                    placeholder="Enter Your email"
                    fullWidth
                    variant="standard"
                    helperText={<ErrorMessage name="email" />}
                  />
                  <Field
                    as={TextField}
                    id="standard-basic"
                    label="Password *"
                    name="password"
                    placeholder="Enter Your Password"
                    fullWidth
                    variant="standard"
                    helperText={<ErrorMessage name="password" />}
                  />

                  <Grid style={{ textAlign: "left", marginTop: 3 }}>
                    <Field
                      as={FormControlLabel}
                      name="remember"
                      control={<Checkbox />}
                      label="Remember me"
                    />
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={props.isSubmitting} // used when click on button than disabled
                  >
                    {/* These used when click on button than  disable and loading till 2 sec and than display sign In button*/}
                    {props.isSubmitting ? "...Loading" : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>

            <Typography style={linkTypography}>
              <Link href="#">Forget Password?</Link>
            </Typography>
            <Typography style={linkTypography}>
              Do you have an account?
              <Link onClick={() => handleChange("event", 1)}>Sign Up</Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
