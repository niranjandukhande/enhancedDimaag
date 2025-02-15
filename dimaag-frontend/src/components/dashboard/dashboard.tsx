import { Button } from "@/components/ui/button";
import { useAxiosClient } from "@/config/axios";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import LinkModel from "./LinkModel";

function Dashboard() {
  const { user } = useUser();
  const api = useAxiosClient();
  const [content, setContent] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const response = await api.get("/content");
      return response.data;
    },
    gcTime: 24 * 60 * 60 * 1000,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isError) {
      toast.loading("Loading content...");
    }
  }, [isError]);
  useEffect(() => {
    let toastId: any;
    if (isLoading) {
      toastId = toast.loading("Loading content...");
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setContent(data);
    }
  }, [data]);
  console.log("content", content);
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
