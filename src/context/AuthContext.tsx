import React, { createContext, useState } from "react";

interface IAuthContext {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<{}>>;
}

const AuthContext = createContext<IAuthContext>({
  auth: {},
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
