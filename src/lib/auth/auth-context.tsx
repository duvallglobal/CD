import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthState, User } from "./types";
import { getRedirectPathAfterLogin } from "../utils";

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "client@example.com",
    password: "client123",
    name: "Client User",
    role: "client",
  },
];

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=strict`;
};

// Helper function to get a cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return null;
};

// Helper function to delete a cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=strict`;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session in cookies
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie) as User;
        setState({ user, isLoading: false, error: null });
      } catch (error) {
        deleteCookie("user");
        setState({ ...initialState, isLoading: false });
      }
    } else {
      setState({ ...initialState, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState({ ...state, isLoading: true, error: null });

    try {
      // Simulate API call with mock data
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = user;
      const authenticatedUser = userWithoutPassword as User;

      // Store user in cookie
      setCookie("user", JSON.stringify(authenticatedUser));
      
      // Update state
      setState({
        user: authenticatedUser,
        isLoading: false,
        error: null,
      });

      // Redirect based on role
      router.push(getRedirectPathAfterLogin(authenticatedUser.role));
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  };

  const logout = () => {
    deleteCookie("user");
    setState({ ...initialState, isLoading: false });
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
