import React, { Component } from 'react';

import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent, FormHelperText } from '@material-ui/core';
import AccountService from '../Services/AccountService';
import {Navigate} from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      confirm_email: '',
      password: '',
      confirm_password: '',
      dob: '',
      error: false,
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      errorMatchingEmail: false,
      errorEmailFormat: false,
      errorMatchingPassword: false,
      errorDOBFormat: false,
      errorDOBAge: false
    }

    this.handleSignup = this.handleSignup.bind(this);
    this.setMissingError = this.setMissingError.bind(this);
    this.setNameError = this.setNameError.bind(this);
    this.setPasswordError = this.setPasswordError.bind(this);
    this.setMatchingEmailError = this.setMatchingEmailError.bind(this);
    this.setEmailFormatError = this.setEmailFormatError.bind(this);
    this.setMatchingPasswordError = this.setMatchingPasswordError.bind(this);
    this.setDOBFormatError = this.setDOBFormatError.bind(this);
    this.setDOBAgeError = this.setDOBAgeError.bind(this);

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  setMissingError(state) {
      this.setState({error: false});
  }

  setNameError(state) {
    this.setState({errorName: false});  }

  setPasswordError(state) {
    this.setState({errorPassword: false});  }

  setMatchingEmailError(state) {
    this.setState({errorMatchingEmail: false});  }
  
  setEmailFormatError(state) {
    this.setState({errorMatchingEmail: false});  }

  setMatchingPasswordError(state) {
    this.setState({errorMatchingPassword: false});  }
  
  setDOBFormatError(state) {
    this.setState({errorDOBFormat: false});  }
  
  setDOBAgeError(state) {
    this.setState({errorDOBAge: false})  }

  handleSignup = (e) => {
    e.preventDefault();

    if (!this.state.username || !this.state.email || !this.state.confirm_email || !this.state.password || !this.state.confirm_password) {
      this.setState({error: true});
      return;
    }
    if (this.state.email !== this.state.confirm_email) {
      this.setState({errorMatchingEmail: true});
      return;
    }
    if (this.state.email.match(new RegExp("[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-z]+")) == null) {
      this.setState({errorEmailFormat: true});
      return;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.setState({errorMatchingPassword: true});
      return;
    }
    if (this.state.username.length < 3 || this.state.username.length > 15) {
      this.setState({errorName: true});
      return;
    }
    if (this.state.password.length < 10 || this.state.password.length > 20) {
      this.setState({errorPassword: true});
      return;
    }
    if (this.state.dob.match(new RegExp("[0-9]{4}\-[0-9]{2}\-[0-9]{2}")) == null) {
      this.setState({errorDOBFormat: true});
      return;
    }
    if (this.#checkAge()) {
      this.setState({errorDOBAge: true});
      return;
    }

    let account = {username: this.state.username, email: this.state.email, crypt_password: this.state.password}
    console.log('\n\n account =>' + JSON.stringify(account));

    AccountService.createAccount(account).then( res => {
    //  this.props.history.push('/signup');
    });
    this.setState({redir: true});


/*
    // connect to server enpoint
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // TODO: authenticate
        // TODO: if authenticated, set UserContext accountId and isAuthenticated
    });
    */
  }

  

  render() {
    if (this.state.redir) {
      //    return <Navigate to={`/${this.context.accountId}`}/>;
      return <Navigate to={'/success' /* this.state.username */}/>
    }
    return (
      <div>
         <>
    {/* for alert */}
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.error}
    onClose={this.setMissingError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please fill in all fields."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorMatchingEmail}
    onClose={this.setMatchingEmailError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your emails match."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorEmailFormat}
    onClose={this.setEmailFormatError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure you enter an email in the proper format."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorMatchingPassword}
    onClose={this.setMatchingPasswordError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your passwords match."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorName}
    onClose={this.setNameError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your username is the proper length."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorPassword}
    onClose={this.setPasswordError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your password is the proper length."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorDOBFormat}
    onClose={this.setDOBFormatError}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please enter your DOB in the format MM/DD/YYYY."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorDOBAge}
    onClose={this.setDOBAge}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Sorry, you are not the right age to use PurdueCircle."/>
    </Snackbar>

    {/* for signup */}
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
            <Typography gutterBottom variant="h5" component="div">
                Welcome to Purdue Circle!
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Please enter the following information to register:
            </Typography>
            <Box m={2}><TextField label="Username"
            variant="outlined" type="text"
            required size="small"
            name='username'
            onChange={this.handleChange}/>
            <FormHelperText>Your username should be between 3 and 15 characters</FormHelperText>
            </Box>
            <Box m={2}><TextField label="Email"
            variant="outlined" type="text"
            required size="small"
            name='email'
            onChange={this.handleChange}/>
            </Box>    

            <Box m={2}><TextField label="Confirm Email"
            variant="outlined" type="text"
            required size="small"
            name='confirm_email'
            onChange={this.handleChange}/>
            <FormHelperText>We won't share your email with anyone</FormHelperText>
            </Box>

            <Box m={2}><TextField label="Password"
            variant="outlined" type="password"
            required size="small"
            name='password'
            onChange={this.handleChange}/>
            </Box>
            <Box m={2}><TextField label="Confirm Password"
            variant="outlined" type="password"
            required size="small"
            name='confirm_password'
            onChange={this.handleChange}/>
            <FormHelperText>Your password should be between 10 and 20 characters</FormHelperText>
            </Box>

            <Box m = {2}><TextField label = "DOB (YYYY-MM-DD)"
            variant="outlined" type="text"
            required size="small"
            name='dob'
            onChange={this.handleChange}/>
            <FormHelperText>You must be at least 13 years old to use PurdueCircle.</FormHelperText>
            </Box>

            <Box m={2} textAlign='center'>
            <Button variant="outlined" color="primary" size="medium"
            onClick={this.handleSignup}>Sign Up</Button>
            </Box>
        </Paper>
      </div>
    </>
      </div>
    );
  }

  //private method to check the age
  #checkAge() {
    const dob = new Date(this.state.dob);
    const today = new Date();
  
    if (isNaN(dob.getTime())) {
      return true;
    }
  
    const diffTime = today - dob;
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));

    console.log("Difference in years: " + diffYears)
  
    if (diffYears < 13) {
      return true;
    } else {
      return false;
    }
  }
}

export default Signup;

/*
import { useState } from 'react';

import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent, FormHelperText, FormControl } from '@material-ui/core';
//import 'react-bootstrap/Container';
//import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
//import './App.css';


export default function Form() {
 
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm_email, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

 
  // States for checking for errors
  const [error, setMissingError] = useState(false);
  const [errorName, setNameError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorMatchingEmail, setMatchingEmailError] = useState(false);
  const [errorMatchingPassword, setMatchingPasswordError] = useState(false);


  function handleSignup() {
    if (!name || !email || !confirm_email || !password || !confirm_password) {
      setMissingError(true);
      return;
    }
    if (email != confirm_email) {
        setMatchingEmailError(true);
        return;
    }
    if (password != confirm_password) {
        setMatchingPasswordError(true);
        return;
    }
    if (name.length < 3 || name.length > 15) {
        setNameError(true);
        return;
    }
    if (password.length < 10 || password.length > 20) {
        setPasswordError(true);
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
  }

  /* no longer necessary because of mui
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

    // Handling the confirm_email change
    const handleConfirmEmail = (e) => {
        setConfirmEmail(e.target.value);
        setSubmitted(false);
      };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

    // Handling the confirm_password change
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setSubmitted(false);
      };
    
 
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setMissingError(true);
    } else {
      setMissingError(false);
    }
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please fill out all of the fields</h1>
      </div>
    );
  };
  */
 
  /*
  return (
      <>
    {/* for alert *//*}
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={error}
    onClose={e => setMissingError(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please fill in all fields."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={errorMatchingEmail}
    onClose={e => setMatchingEmailError(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your emails match."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={errorMatchingPassword}
    onClose={e => setMatchingPasswordError(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure  your passwords match."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={errorName}
    onClose={e => setNameError(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your username is the proper length."/>
    </Snackbar>
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={errorPassword}
    onClose={e => setPasswordError(false)}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your password is the proper length."/>
    </Snackbar>

    {/* for signup *//*}
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
            <Typography gutterBottom variant="h5" component="div">
                Welcome to Purdue Circle!
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Please enter the following information to register:
            </Typography>
            <Box m={2}><TextField label="Username"
            variant="outlined" type="text"
            required size="small"
            onChange={e => setName(e.target.value)}/>
            <FormHelperText>Your username should be between 3 and 15 characters</FormHelperText>
            </Box>
            <Box m={2}><TextField label="Email"
            variant="outlined" type="text"
            required size="small"
            onChange={e => setEmail(e.target.value)}/>
            </Box>    

            <Box m={2}><TextField label="Confirm Email"
            variant="outlined" type="text"
            required size="small"
            onChange={e => setConfirmEmail(e.target.value)}/>
            <FormHelperText>We won't share your email with anyone</FormHelperText>
            </Box>

            <Box m={2}><TextField label="Password"
            variant="outlined" type="password"
            required size="small"
            onChange={e => setPassword(e.target.value)}/>
            </Box>
            <Box m={2}><TextField label="Confirm Password"
            variant="outlined" type="password"
            required size="small"
            onChange={e => setConfirmPassword(e.target.value)}/>
            <FormHelperText>Your password should be between 10 and 20 characters</FormHelperText>
            </Box>
            <Box m={2} textAlign='center'>
            <Button variant="outlined" color="primary" size="medium"
            onClick={handleSignup}>Sign Up</Button>
            </Box>
        </Paper>
      </div>
    </>

  );
}
  /*
  original page hiding out at the bottom
  <Container>
  <form>
      <div className="jumbotron">
          <h2>Welcome to Purdue Circle!</h2>
          <h3>Please enter the following information to register your account:</h3>
          <div class="mb-3">
              <label for="inputUsername1" class="form-label">Username</label>
              <input type="username" class="form-control" id="inputUsername1" aria-describedby="usernameHelp"/>
              <div id="usernameHelp" class="form-text">Your Username should be between 3 and 15 characters.</div>
          </div>
          <div class="mb-3">
              <label for="inputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="inputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
              <label for="inputEmail2" class="form-label">Confirm Email address</label>
              <input type="email" class="form-control" id="inputEmail2" aria-describedby="emailHelp"/>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
              <label for="inputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputPassword1" aria-describedby='passwordHelp'/>
              <label for="inputPassword2" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="inputPassword2" aria-describedby='passwordHelp'/>
              <div id="passwordHelp" class="form-text">Your Password should be between 10 and 20 characters.</div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
      </div>
  </form>
</Container>

*/