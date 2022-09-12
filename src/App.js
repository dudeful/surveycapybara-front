import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContextProvider } from './components/Context/UserContext';
import { SocketContextProvider } from './components/Context/SocketContext';
import Pool from './components/Pool';
import Login from './components/Login';
import './App.css';

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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
