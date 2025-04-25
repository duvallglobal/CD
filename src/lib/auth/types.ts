export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
}

export interface Session {
  user: User;
  expires: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
