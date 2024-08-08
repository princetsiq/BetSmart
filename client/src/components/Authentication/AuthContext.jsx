import React, { createContext, useState, useContext, useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';
import AuthService from './AuthService';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkUserSession() {
      try {
        await AuthService.getUserSession();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    checkUserSession();
  }, []);

  Hub.listen('auth', ({ payload }) => {
    switch (payload.event) {
      case 'signedIn':
        setIsAuthenticated(true);
        console.log('user has been signedIn successfully');
        break;
      case 'signedOut':
        setIsAuthenticated(false);
        console.log('user has been signedOut successfully');
        break;
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};