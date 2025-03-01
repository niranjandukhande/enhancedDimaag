import Signin from '@/components/auth/signIn';
import Signup from '@/components/auth/signUp';
import SSOCallback from '@/components/auth/ssoCallBack';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Design2Dashboard from './components/dashboard/utils/dashboard1';
import Design2Detail from './components/dashboard/utils/newContentDetails';
import UserProfileAlt from './components/explore/newBrain';
import ExploreUsers from './components/explore/newExplore';
import Home from './components/home';
import Profile from './components/profile/profile';
import { ProtectedRoute } from './middleware/protected';
import { PublicRoute } from './middleware/public';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <div className="flex justify-center">
          <MinimalNavbar />
        </div> */}

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
                <Design2Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedRoute>
                <Design2Detail />
              </ProtectedRoute>
            }
          />
          <Route path="/explore" element={<ExploreUsers />} />

          {/* <Route path="/explore/:username" element={<Brain />} /> */}

          <Route path="/explore/:username" element={<UserProfileAlt />} />
          <Route path="/ssocallback" element={<SSOCallback />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
