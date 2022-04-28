import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { Typography, AppBar, Box, Toolbar, CardHeader } from '@material-ui/core';
import { Navigate, Link, Outlet } from "react-router-dom";
import { useEffect } from 'react';

export default function DenseAppBar() {

  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('isAuthenticated'))

  // to make navbar re-render appropriately when localStorage.isAuthenticated changes
  useEffect(() => {
      const onStorage = () => setLoggedIn(localStorage.getItem('isAuthenticated'));
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
  }, []);
  
  if (loggedIn) {
    return (
        <div>
          <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" color='white'>
              <Toolbar variant="dense">
  
              <Typography variant="h6" color="inherit" component="div">
                  PurdueCircle
              </Typography>
              <a href="javascript:;" onClick={() => window.location.href="/profile/".concat(localStorage.getItem('username'))}>
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Profile
                  </Typography>
              </a>
              {/* <Link to="/login">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Login
                  </Typography>
              </Link> */}
              <Link to="/logout">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Logout
                  </Typography>
              </Link>
              {/* <Link to="/signup">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Signup
                  </Typography>
              </Link> */}
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
              {/* <Link to="/delete_post">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Delete Post
                  </Typography>
              </Link> */}
                  <Link to="/cred_request">
                      <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                          Change Credentials
                      </Typography>
                </Link>
                <Link to="/topicsearch">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Topic Search
                  </Typography>
              </Link>
              <Link to="/following">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Following
                  </Typography>
              </Link>
              <Link to="/blockList">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Block List
                </Typography>
            </Link>
              <Link to="/saved">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Saved
                  </Typography>
              </Link>
              <Link to="/dms">
                  <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                      Messaging
                  </Typography>
              </Link>
              </Toolbar>
          </AppBar>
          </Box>
          <Outlet />
        </div>
  
    );
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color='white'>
          <Toolbar variant="dense">

          <Typography variant="h6" color="inherit" component="div">
              PurdueCircle
          </Typography>
          {/* <Link to="/profile">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Profile
              </Typography>
          </Link> */}
          <Link to="/login">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Login
              </Typography>
          </Link>
          {/* <Link to="/logout">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Logout
              </Typography>
          </Link> */}
          <Link to="/signup">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Signup
              </Typography>
          </Link>
          {/* <Link to="/timeline">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Timeline
              </Typography>
          </Link> */}
          {/* <Link to="/post">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Create Post
              </Typography>
          </Link> */}
          {/* <Link to="/delete_post">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Delete Post
              </Typography>
          </Link> */}
            {/* <Link to="/cred_request">
                <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                    Change Credentials
                </Typography>
            </Link> */}
            <Link to="/topicsearch">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Topic Search
              </Typography>
          </Link>
          {/* <Link to="/following">
              <Typography variant="h6" color="inherit" component="div" style={{ padding: "25px"}}>
                  Following
              </Typography>
          </Link> */}
          </Toolbar>
      </AppBar>
      </Box>
      <Outlet />
    </div>

);

  
}