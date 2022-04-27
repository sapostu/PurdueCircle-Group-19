import logo from './logo.svg';
import './App.css';

import React from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
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
import Timeline from './Components/Timeline';
import Userline from './Components/Userline';
import Topic from './Components/Topic';
import Post from './Components/Post';
import TopicSearch from './Components/SearchTopic';
import Logout from './Components/Logout';
import Following from './Components/Following';
import {UserContext} from './UserContext';
import UserProvider from './UserContext';
import DM from './Components/DM';
import BlockList from './Components/BlockList';


function App() {
  // allows all children of <App/> to get and modify user's id and authentication status through UserContext

  localStorage.setItem('token', 'fdsa');
  return (
  <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to={'/login'}/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/" element={<Navbar />}>
            <Route path="/profile_temp" element={<><h1>asdf</h1><Navbar /><Profile /></>}/>
            <Route path="/edit" element={<Edit />}/>
            <Route path="/delete" element={<Delete />}/>
            <Route path="/cred_request" element={<CredRequestScreen />}/>
            <Route path="/profile" element={<Profile />}>
              <Route path=":username" name="fdsa" element={<Profile/>}/>
            </Route>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/success" element={<Success />}/>
            <Route path="/post" element={<CreatePost />}/>
            <Route path="/delete_post" element={<DeletePost />}/>
            <Route path="/timeline" element={<Timeline />}/>
            <Route path="/userline" element={<Userline />}>
              <Route path=":username" element={<Userline />}/>
            </Route>
            <Route path="/topic" element={<Topic />}>
              <Route path=":topic" name="fdsa" element={<Topic />}/>
            </Route>
            <Route path="/p" element={<Post />}>
              <Route path=":post_id" name="fdsa" element={<Post />}/>
            </Route>
            <Route path="/dm" element={<DM />}>
              <Route path=":theirID" name="fdsa" element={<Post />}/>
            </Route>
            <Route path="/topicsearch" element={<TopicSearch/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/following" element={<Following />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
