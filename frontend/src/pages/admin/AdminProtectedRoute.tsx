import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Mock admin check — in production, verify role from JWT/server.
 * For now, any authenticated user can access admin.
 * Replace this check with real role verification when backend is connected.
 */
export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
