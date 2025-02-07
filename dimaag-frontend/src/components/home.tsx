import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to={"/signin"}>Signin</Link>
      <Link to={"/signup"}>Signup</Link>
    </div>
  );
}

export default Home;
