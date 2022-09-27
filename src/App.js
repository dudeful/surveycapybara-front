import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContextProvider } from './components/Context/UserContext';
import { SocketContextProvider } from './components/Context/SocketContext';
import PoolForms from './components/PoolForms/';
import Pool from './components/Pool';
import Login from './components/Login';
import EnterCode from './components/EnterCode';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pool/:pool_id"
            element={
              <SocketContextProvider>
                <Pool />
              </SocketContextProvider>
            }
          />
          <Route path="/create-pool" element={<PoolForms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/code" element={<EnterCode />} />
          <Route path="/" element={<EnterCode />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
