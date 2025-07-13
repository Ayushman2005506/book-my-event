
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthUser } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, role: 'student' | 'club') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data
    const storedAuth = localStorage.getItem('eventPlatformAuth');
    if (storedAuth) {
      try {
        const { user, token } = JSON.parse(storedAuth);
        setUser(user);
        setToken(token);
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem('eventPlatformAuth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : email.includes('club') ? 'club' : 'student',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      
      localStorage.setItem('eventPlatformAuth', JSON.stringify({ user: mockUser, token: mockToken }));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string, role: 'student' | 'club') => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        username,
        role,
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      
      localStorage.setItem('eventPlatformAuth', JSON.stringify({ user: mockUser, token: mockToken }));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('eventPlatformAuth');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
