import logo from './logo.svg';
import './App.css';

import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState } from 'react';

import LoginScreen from './Components/LoginScreen';
import Signup from './Components/Signup';
import Profile from './Components/Profile'

import {UserContext} from './UserAuthContext';

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
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/profile_temp" element={<Profile />}/>

          <Route path="/profile/:account_id" element={
          isAuthenticated ? <h1>account profile placeholder</h1> : <LoginScreen/>}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
