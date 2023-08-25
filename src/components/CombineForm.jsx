import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Login from "./Login";
import Signup from "./Signup";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function CombineForm() {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);

  const paperStyle = { width: 340, margin: "20px auto" };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for SignUp
  const handleSignUp = (userData) => {
    setUsers([...users, userData]);
    localStorage.setItem('users', JSON.stringify([...users, userData]));
  };

  // for SignIn
  const handleSignIn = (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = storedUsers.find((user) => user.username === userData.username && user.password === userData.password);
    if (matchedUser) {
      alert('Sign in successful');
    } else {
      alert('Sign in failed');
    }
  };

  return (
    <>
      <Paper style={paperStyle} elevation={20}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="SignIn" />
          <Tab label="SignUp" />
        </Tabs>
        {
          <>
            <CustomTabPanel value={value} index={0}>
              <Login handleChange={handleChange} handleSignIn={handleSignIn}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Signup handleSignUp={handleSignUp}/>
            </CustomTabPanel>
          </>
        }
      </Paper>
    </>
  );
}

export default CombineForm;
