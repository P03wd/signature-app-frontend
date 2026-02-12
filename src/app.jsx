import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import VerifySignature from "./components/verifysignature";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
// function App() {
//   return (
//     <div>
//       <h1>Document Signature App</h1>
//       <VerifySignature />
//     </div>
//   );
// }