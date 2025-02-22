import { Outlet } from 'react-router-dom';
import MinimalNavbar from './Layout/MinimalNavbar';
import Footer from './Layout/footer';

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
