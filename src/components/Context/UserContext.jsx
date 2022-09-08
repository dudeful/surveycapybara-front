import React, { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'test_' + Math.ceil(Math.random() * 100) });

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
