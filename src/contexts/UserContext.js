import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const UserSetContext = createContext();
const UserUpdateContext = createContext();

export const getUser = () => useContext(UserContext);
export const useUserSet = () => useContext(UserSetContext);
export const useUserUpdate = () => useContext(UserUpdateContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUser = (update) => {
    setUser({ ...user, ...update });
  };

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        <UserUpdateContext.Provider value={updateUser}>{children}</UserUpdateContext.Provider>
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
};
