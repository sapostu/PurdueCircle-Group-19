import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import {TextField, Typography, Box, Paper, Button, Snackbar, SnackbarContent, FormHelperText } from '@material-ui/core';

class Success extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
         <>

    {/* for main container */}
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
                Congrats! Welcome to Purdue Circle!
            </Typography>
            <Box m={2} textAlign='center'>
            <Button variant="outlined" color="primary" size="medium" ><Link to='/login' style={{ color: "inherit", "text-decoration": "none" }}>Go Sign in</Link>
            </Button>
            </Box>
        </Paper>
      </div>
    </>
      </div>
    );
  }
}
export default Success;