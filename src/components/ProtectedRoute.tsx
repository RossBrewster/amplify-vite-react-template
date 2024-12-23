import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}