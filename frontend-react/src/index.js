import React from 'react';
import ReactDOM from 'react-dom';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './Components/LoginScreen';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginScreen />}/>
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/signup" element={<h1>signup placeholder</h1>}/>
          
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
