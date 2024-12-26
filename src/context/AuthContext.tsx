import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the Auth context
interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  password: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide the context to the rest of the app
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    setPassword(password);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setPassword(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
