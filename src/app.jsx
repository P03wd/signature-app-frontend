import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import VerifySignature from "./components/verifysignature";
import PublicSign from "./pages/publicsign";
import DocumentView from "./pages/documentview";
import SignPage from "./pages/signpage";

// Simple Protected Route component
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/public-sign/:token" element={<PublicSign />} />
        <Route path="/invite-sign/:token" element={<SignPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <PrivateRoute>
              <DocumentView />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <PrivateRoute>
              <VerifySignature />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}