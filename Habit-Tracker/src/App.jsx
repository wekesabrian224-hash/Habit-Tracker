import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import GardenView from "./pages/GardenView";
import GrowthCoachView from "./pages/GrowthCoachView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<Navigate to="/garden" replace />} />

        <Route path="/garden" element={<GardenView />} />

        <Route path="/coach" element={<GrowthCoachView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
