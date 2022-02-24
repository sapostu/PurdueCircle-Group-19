import React, { Component } from 'react';
import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserAuthContext';
import LoginService from '../Services/LoginService';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertBool: false,  // determines if 'missing fields' alert is shown
            usernameEmail: "", // tracks first field (either username or email)
            password: "", // tracks second field
            toProfile: false // setting true navigates to profile page
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    // for tracking user authentication status
    // use this.context to access
    static contextType = UserContext;

    /**
     * Handles submitting login form
     * Ensures fields are filled in, then authenticates
     */
    handleLogin = () => {
        if (!this.state.usernameEmail || !this.state.password) {
          this.setState({alertBool: true});
          return;
        }

        // TODO: authenticate with axios
        let account = {username: this.state.usernameEmail, crypt_password: this.state.password}
        console.log('\n\n account =>' + JSON.stringify(account));
    
        LoginService.loginAccount(account).then( (res) => {
          console.log(res);
          this.props.history.push('/profile');
        });

        // navigate to user's profile page if authenticated
        this.setState({toProfile: true});
    }

    /**
     * LoginScreen component
     * Redirects to profile page when this.state.toProfile is set to true
     * Includes pop-up alert (Snackbar) and physical parts of form
     */
    render() {
        if (this.state.toProfile) {
          return <Navigate to={`/${this.context.accountId}`}/>;
        }
        return (
            <div>
              {/* for alert */}
              <Snackbar
              anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
              open={this.state.alertBool}
              onClose={e => this.setState({alertBool: false})}
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
                  onChange={e => this.setState({usernameEmail: e.target.value})}/></Box>
                  <Box m={2}><TextField label="Password"
                  variant="outlined" type="password"
                  required size="small"
                  onChange={e => this.setState({password: e.target.value})}
                  /></Box>
                  <Box m={2} textAlign='center'>
                    <Button variant="outlined" color="primary" size="medium"
                    onClick={this.handleLogin}>Log In</Button>
                  </Box>    
                  <Box m={2} textAlign='center'>
                    <Typography>
                      <Link to="/signup">Need an account? Sign Up</Link>
                    </Typography>
                  </Box>  
                </Paper>
              </div>
            </div>
        );
    }
}

export default LoginScreen;