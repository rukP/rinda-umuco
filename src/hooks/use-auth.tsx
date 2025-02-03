import { createContext, useContext, useEffect, useState } from "react";
import { mockSession } from "@/lib/mock-data";

interface AuthContextType {
  session: typeof mockSession | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<typeof mockSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth state check
    setTimeout(() => {
      setSession(mockSession);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}