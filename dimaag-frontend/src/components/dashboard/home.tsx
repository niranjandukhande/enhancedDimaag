import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const getUser = useUser();
  console.log(getUser);
  return (
    <>
      Dashboard
      <div>{JSON.stringify(getUser.user?.emailAddresses[0].emailAddress)}</div>
      <SignOutButton />
      <Link to={"/signin"}>Signin</Link>
    </>
  );
}

export default Dashboard;
