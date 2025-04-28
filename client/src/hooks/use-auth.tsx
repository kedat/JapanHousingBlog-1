import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { User } from "../data/users";
import { authService } from "../services/auth-service";

// Interface for login credentials
interface LoginData {
  username: string;
  password: string;
}

// Interface for registration data
interface RegisterData {
  username: string;
  password: string;
  name?: string;
  email?: string;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

// Create context with default null value
export const AuthContext = createContext<AuthContextType | null>(null);

// Export the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State to store the current user
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Load current user on mount
  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      setIsLoading(true);
      try {
        const user = await authService.login(credentials);
        setUser(user);
        setError(null);
        return user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["currentUser"], user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      setIsLoading(true);
      try {
        const user = await authService.register(credentials);
        setUser(user);
        setError(null);
        return user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["currentUser"], user);
      toast({
        title: "Registration successful",
        description: "Welcome to Japan Housing!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      try {
        await authService.logout();
        setUser(null);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
