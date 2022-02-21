import React, { Component } from 'react';
import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserAuthContext';

class LoginScreen extends Component {
    /**
     * Constructor that declares the alert boolean and the 2 user input fields
     * @param props properties to pass on to Component class 
     */
    constructor(props) {
        super(props);
        this.state = {
            alertBool: false,  // determines if 'missing fields' alert is shown
            unameEmail: "", // tracks first field (either username or email)
            pwd: "" // tracks second field (password)
        }
    }

    // for tracking user authentication status
    // use this.context to access
    static contextType = UserContext;

    /**
     * Handles submitting login form
     * Ensures fields are filled in, then authenticates
     */
    handleLogin = () => {
        if (!this.state.unameEmail || !this.state.pwd) {
          this.setState({alertBool: true});
          return;
        }

        // TODO: authenticate with axios

        this.props.router.push('/profile/:account_id')
    }

    /**
     * LoginScreen component
     * Includes pop-up alert (Snackbar) and physical parts of form
     */
    render() {
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
                  onChange={e => this.setState({unameEmail: e.target.value})}/></Box>
                  <Box m={2}><TextField label="Password"
                  variant="outlined" type="password"
                  required size="small"
                  onChange={e => this.setState({pwd: e.target.value})}
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