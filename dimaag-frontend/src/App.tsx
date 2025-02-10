import Signin from "@/components/auth/signIn";
import Signup from "@/components/auth/signUp";
import SSOCallback from "@/components/auth/ssoCallBack";
import Dashboard from "@/components/dashboard/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./components/explore/explore";
import Home from "./components/home";
import MinimalNavbar from "./components/Layout/navbar1";
import Profile from "./components/profile/profile";
import { ProtectedRoute } from "./middleware/protected";
import { PublicRoute } from "./middleware/public";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MinimalNavbar />
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ssocallback" element={<SSOCallback />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
