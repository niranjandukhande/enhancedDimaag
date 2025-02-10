import { Outlet } from "react-router-dom";
import MinimalNavbar from "./Layout/navbar1";
import Footer from "./Layout/footer";

function Layout() {
  return (
    <>
      <MinimalNavbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
