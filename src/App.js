import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './components/Context/UserContext';
import { SocketContextProvider } from './components/Context/SocketContext';
import Pool from './components/Pool';
import Login from './components/Login';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pool"
            element={
              <SocketContextProvider>
                <Pool />
              </SocketContextProvider>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
