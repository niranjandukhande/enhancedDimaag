import { Outlet } from 'react-router-dom';
import MinimalNavbar from './Layout/MinimalNavbar';
import Footer from './Layout/footer';

function Layout() {
  return (
    <div>
      <MinimalNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
