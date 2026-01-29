import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  token: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'admin_session_token';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);
    if (storedToken) {
      verifySession(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifySession = async (sessionToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth/verify', {
        body: { token: sessionToken },
      });

      if (error) throw error;

      if (data?.valid) {
        setIsAuthenticated(true);
        setUsername(data.username);
        setToken(sessionToken);
      } else {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        setIsAuthenticated(false);
        setUsername(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth/login', {
        body: { username, password },
      });

      if (error) throw error;

      if (data?.success && data.token) {
        sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        setIsAuthenticated(true);
        setUsername(data.username);
        setToken(data.token);
        return { success: true };
      }

      return { success: false, error: data?.error || 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const storedToken = sessionStorage.getItem(ADMIN_TOKEN_KEY);
      if (storedToken) {
        await supabase.functions.invoke('admin-auth/logout', {
          body: { token: storedToken },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      setIsAuthenticated(false);
      setUsername(null);
      setToken(null);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        username,
        login,
        logout,
        token,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
