import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180 deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const Signup = ({handleSignUp}) => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "0 auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "green" };
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "It's text too short")
      .required("Name Required *"),
    email: Yup.string().email("Enter valid email").required("Email Required *"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Gender Required *"),
    phoneNumber: Yup.number()
      .typeError("Enter valid phone number")
      .required(" Phone number Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password not matched"
    ),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms & conditions"
    ),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    handleSignUp(values)
    // console.log(props);
    // use for when click on button than disable button and empty fields
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Sign Up </h2>
            <Typography variant="caption">
              Please fill these form to create an account!
            </Typography>
          </Grid>
          <Formik
            sx={{ color: "red" }}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  id="standard-basic"
                  fullWidth
                  label="Name"
                  name="name"
                  placeholder="Enter your Name"
                  variant="standard"
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  id="standard-basic"
                  type="email"
                  fullWidth
                  label="Email"
                  name="email"
                  placeholder="Enter your Email"
                  variant="standard"
                  helperText={<ErrorMessage name="email" />}
                />
                <Grid style={{ textAlign: "left", marginTop: 5 }}>
                  <FormControl>
                    <FormLabel id="demo-customized-radios">Gender</FormLabel>
                    <Field
                      as={RadioGroup}
                      defaultValue="female"
                      align="left"
                      name="gender"
                      aria-labelledby="demo-customized-radios"
                      // name="customized-radios"
                      style={{ display: "initial" }}
                    >
                      <FormControlLabel
                        value="female"
                        align="left"
                        control={<BpRadio />}
                        labelPlacement="start"
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        align="left"
                        control={<BpRadio />}
                        labelPlacement="start"
                        label="Male"
                      />
                    </Field>
                  </FormControl>
                  <FormHelperText>
                    {<ErrorMessage name="gender" />}
                  </FormHelperText>
                </Grid>
                <Field
                  as={TextField}
                  id="standard-basic"
                  type="number"
                  name="phoneNumber"
                  fullWidth
                  label="Phone Number"
                  placeholder="Enter your Phone Number"
                  variant="standard"
                  helperText={<ErrorMessage name="phoneNumber" />}
                />
                <Field
                  as={TextField}
                  id="standard-basic"
                  type="password"
                  name="password"
                  fullWidth
                  label="Password"
                  placeholder="Enter your Password"
                  variant="standard"
                  helperText={<ErrorMessage name="password" />}
                />
                <Field
                  as={TextField}
                  id="standard-basic"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  label="Confirm Password"
                  placeholder="Enter your Confirm password"
                  variant="standard"
                  helperText={<ErrorMessage name="confirmPassword" />}
                />
                <Grid style={{ textAlign: "left", marginTop: 3 }}>
                  <FormControlLabel
                    control={<Field as={Checkbox} name="termsAndConditions" />}
                    label="I accept terms & conditions"
                  />
                </Grid>
                <FormHelperText>
                  {<ErrorMessage name="termsAndConditions" />}
                </FormHelperText>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting ? "Loading" : "Sign up"}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </>
  );
};

export default Signup;
