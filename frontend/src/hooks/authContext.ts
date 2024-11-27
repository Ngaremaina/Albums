import { createContext, ReactNode, useContext } from 'react'; // Ensure necessary imports
import { UserResponse } from '../models/responses/UserResponse';

// Define AuthContextType interface
export interface AuthContextType {
    isLoading: boolean;
    handleLogin: (email: string, password: string) => void;
    handleLogout: () => void;
    userToken: string | null;
    userData: UserResponse | null;
}

// Create AuthContext with default values
export const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    handleLogin: () => {},
    handleLogout: () => {},
    userToken: null,
    userData: null,
});

// Define AuthProviderProps interface for children
export interface AuthProviderProps {
    children: ReactNode; // Ensure ReactNode is imported
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
