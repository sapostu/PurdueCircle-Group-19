import React, { Component } from 'react';
import LoginService from '../Services/LoginService';
import { Link, Navigate } from 'react-router-dom';

import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent, FormHelperText } from '@material-ui/core';
import DeleteService from "../Services/DeleteService";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: '',
      errorNotMatching: false,
      usernameEmail: '',
      password: '',
      toProfile: false

    }

    this.handleDelete = this.handleDelete.bind(this);
    this.setErrorNotMatching = this.setErrorNotMatching.bind(this);

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  setErrorNotMatching(state) {
    this.setState({errorNotMatching: false});
}


  handleDelete() {
    if (this.state.confirm !== "DELETE") {
      this.setState({errorNotMatching: true});
      return;
    }

    let account = {username: this.state.usernameEmail, crypt_password: this.state.password}
    console.log('\n\n account =>' + JSON.stringify(account));

    DeleteService.deleteAccount(account).then( (res) => {
      console.log(res);

   //   this.props.history.push('/profile');
    });


    // TODO : Actually delete the user's account

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
    if (this.state.toProfile) {
        //    return <Navigate to={`/${this.context.accountId}`}/>;
              return <Navigate to={'/login'}/>
    }
    return (
      <div>
         <>
    {/* for alert */}
    <Snackbar
    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
    open={this.state.errorNotMatching}
    onClose={this.setErrorNotMatching}
    autoHideDuration={5000}>
      <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please match the text correctly"/>
    </Snackbar>

    {/* for main container */}
    <div style={{
      display: "flex",
      backgroundColor: "#f5f5f5",
      position: "absolute",
      top: 'relative', left: 0,
      width: "100vw",
      height: "100vh"
      }}>

        <Paper elevation={8} style={{
            backgroundColor: "#f5f5f5",
            margin: "auto",
            padding: "20px"
        }} id="login_cont">
            <Typography gutterBottom variant="h5" component="div" style={{ color: "#ff0000" }}>
                WARNING: This action cannot be undone
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Please type 'DELETE' to confirm your intent:
            </Typography>
            <Box m={2}><TextField label="Delete Account"
            variant="outlined" type="text"
            required size="small"
            name='confirm'
            color='success'
            onChange={this.handleChange}/>
            <FormHelperText>You must copy the statement exactly</FormHelperText>
            </Box>
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
            onClick={this.handleDelete}>Delete Account</Button>
            </Box>
        </Paper>
      </div>
    </>
      </div>
    );
  }
}

export default Delete;