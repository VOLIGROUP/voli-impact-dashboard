import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../services/mockData';
import { AuthContextType, User } from '../types/auth';
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('voli_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
        localStorage.removeItem('voli_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // In a real app, we would verify the password here
      // For demo purposes, we'll just accept any password
      
      // Update last active
      const userWithUpdatedActivity = {
        ...foundUser,
        lastActive: new Date().toISOString()
      };
      
      // Save to state and localStorage
      setUser(userWithUpdatedActivity);
      localStorage.setItem('voli_user', JSON.stringify(userWithUpdatedActivity));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voli_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be done on the server)
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user',
        avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        points: 0,
        badges: ['Newcomer'],
        level: 1,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      };
      
      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem('voli_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to VOLI, ${name}!`,
      });
      
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user data
      const updatedUser = { ...user, ...userData, lastActive: new Date().toISOString() };
      
      // In a real app, this would call an API to update the user profile
      // For the mock data, we'll just update the local state
      
      // Save to state and localStorage
      setUser(updatedUser);
      localStorage.setItem('voli_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      
      return updatedUser;
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
