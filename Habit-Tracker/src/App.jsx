import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/dashboard"
          element={
            <div>
              <h1>🌱 Habit Garden Dashboard</h1>
              <p>Dashboard coming soon...</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;