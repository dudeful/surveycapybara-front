import React, { createContext, useState } from 'react';

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'anonymous', email: null });

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
