"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import LinkModel from "./LinkModel";

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        {user?.emailAddresses[0].emailAddress && (
          <p>Email: {user.emailAddresses[0].emailAddress}</p>
        )}
      </div>
      <div className="flex space-x-4 mb-4">
        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
        <Button asChild variant="outline">
          <Link to="/signin">Sign In</Link>
        </Button>
        <LinkModel />
      </div>
    </div>
  );
}

export default Dashboard;
