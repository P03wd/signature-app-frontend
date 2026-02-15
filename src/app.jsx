import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import VerifySignature from "./components/verifysignature";

// (optional future page)
function DocumentView() {
  return <h2>Document View Page (Coming Next Step)</h2>;
}

export default function App() {
  return (
<BrowserRouter future={{ v7_relativeSplatPath: true }}>
<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document/:id" element={<DocumentView />} />
        <Route path="/verify" element={<VerifySignature />} />
      </Routes>
    </BrowserRouter>
  );
}
