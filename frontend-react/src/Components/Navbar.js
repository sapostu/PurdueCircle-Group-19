import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Typography, AppBar, Box, Toolbar, CardHeader } from '@material-ui/core';
import { Link, Outlet } from "react-router-dom";

export default function DenseAppBar() {
  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="absolute" color='white'>
            <Toolbar variant="dense">

            <Typography variant="h6" color="inherit" component="div">
                PurdueCircle
            </Typography>
            <Link to="/profile">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Profile
                </Typography>
            </Link>
            <Link to="/login">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Login
                </Typography>
            </Link>
            <Link to="/signup">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Signup
                </Typography>
            </Link>
            <Link to="/timeline">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Timeline
                </Typography>
            </Link>
            <Link to="/post">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Create Post
                </Typography>
            </Link>
            <Link to="/delete_post">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Delete Post
                </Typography>
            </Link>
                <Link to="/cred_request">
                    <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                        Change Credentials
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
        </Box>
        <Outlet />
      </div>

  );
}