import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, userId } = useAuth();
  console.log("userId", userId);
  const navigate = useNavigate();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (userId) {
    navigate("/dashboard");
  }

  return children;
};
