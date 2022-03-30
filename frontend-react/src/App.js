import logo from './logo.svg';
import './App.css';

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState } from 'react';

import LoginScreen from './Components/LoginScreen';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Edit from './Components/Edit';
import Delete from './Components/Delete';
import CredRequestScreen from './Components/CredChange';
import Navbar from './Components/Navbar';
import Success from './Components/Success';
import CreatePost from './Components/CreatePost';
import DeletePost from './Components/DeletePost';
import {UserContext} from './UserAuthContext';
import Timeline from './Components/Timeline';
import Userline from './Components/Userline';

function App() {
  // allows all children of <App/> to get and modify user's id and authentication status through UserContext
  const [accountId, setAccountId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authValue = { accountId, setAccountId, isAuthenticated, setIsAuthenticated };

  return (
  <UserContext.Provider value={authValue}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginScreen />}/>
          <Route path="/" element={<Navbar />}>
            <Route path="/profile_temp" element={<><h1>asdf</h1><Navbar /><Profile /></>}/>
            <Route path="/edit" element={<Edit />}/>
            <Route path="/delete" element={<Delete />}/>
            <Route path="/cred_request" element={<CredRequestScreen />}/>
            <Route path="/profile" element={<Profile />}>
              <Route path=":username" name="fdsa" element={<Profile/>}/>
            </Route>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/post" element={<CreatePost />}/>
            <Route path="/delete_post" element={<DeletePost />}/>
            <Route path="/timeline" element={<Timeline />}/>
            <Route path="/userline" element={<Userline />}>
              <Route path=":username" element={<Userline />}/>
            </Route>
          </Route>


        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
