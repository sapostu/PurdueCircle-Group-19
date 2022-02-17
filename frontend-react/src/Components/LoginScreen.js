import { useState, useEffect, useContext } from 'react';
import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserAuthContext';

export default function LoginScreen() {
  const { isAuthenticated, setIsAuthenticated, accountId,  setAccountId } = useContext(UserContext);

  // clears history to prevent users from backing up to a restricted page
  const navigate = useNavigate();
  useEffect(() => { navigate('/login', { replace: true }); }, [isAuthenticated]);

  // boolean for displaying missing-field error
  const [alertBool, setAlertBool] = useState(false);

  // tracks input fields
  const [unameEmail, setUnameEmail] = useState("");
  const [pwd, setPwd] = useState("");

  // function to handle pressing the 'log in' button
  function handleLogin() {
    if (!unameEmail || !pwd) {
      setAlertBool(true);
      return;
    }

    const url = ""; // TODO: change to actual endpoint url

    // connect to server enpoint
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // TODO: authenticate
        // TODO: if authenticated, set UserContext accountId and isAuthenticated
      });
  };

  return (
    <>
    {/* for alert */}
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={alertBool}
    onClose={e => setAlertBool(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please fill in both fields."/>
    </Snackbar>

    {/* actual login screen */}
    <div style={{
      display: "flex",
      backgroundColor: "#f5f5f5",
      position: "absolute",
      top: 0, left: 0,
      width: "100vw",
      height: "100vh"
      }}>
      <Paper elevation={8} style={{
        backgroundColor: "#f5f5f5",
        margin: "auto",
        padding: "20px"
      }} id="login_cont">
        <Box m={2}><TextField label="Email/Username"
        variant="outlined" type="text"
        required size="small"
        onChange={e => setUnameEmail(e.target.value)}/></Box>
        <Box m={2}><TextField label="Password"
        variant="outlined" type="password"
        required size="small"
        onChange={e => setPwd(e.target.value)}
        /></Box>
        <Box m={2} textAlign='center'>
          <Button variant="outlined" color="primary" size="medium"
          onClick={handleLogin}>Log In</Button>
        </Box>    
        <Box m={2} textAlign='center'>
          <Typography>
            <Link to="/signup">Need an account? Sign Up</Link>
          </Typography>
        </Box>  
      </Paper>
    </div>
    </>
  );
}