import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import GardenView from "./pages/GardenView";
import GrowthCoachView from "./pages/GrowthCoachView";
import BottomNav from "./BottomNav";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/garden"
          element={
            <AppLayout>
              <GardenView />
            </AppLayout>
          }
        />

        <Route
          path="/coach"
          element={
            <AppLayout>
              <GrowthCoachView />
            </AppLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          }
        />

        <Route
          path="/dashboard"
          element={<Navigate to="/garden" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;