// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react"

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "@/components/auth/signIn";
import Dashboard from "@/components/dashboard/home";
import Signup from "@/components/auth/signUp";
import SSOCallback from "@/components/auth/ssoCallBack";
import Home from "./components/home";

export default function App() {
  return (
    // <header>
    //   <SignedOut>
    //     <SignInButton />
    //   </SignedOut>
    //   <SignedIn>
    //     <UserButton />
    //   </SignedIn>
    // </header>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ssocallback" element={<SSOCallback />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
