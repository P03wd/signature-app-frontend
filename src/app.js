// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/dashboard";
// import Login from "./pages/login";
// import VerifySignature from "./components/verifysignature";
// import Upload from "./pages/upload";
// import DocumentView from "./pages/documentview";
// import AuditLogs from "./pages/auditlogs";
// import Navbar from "./components/navbar";

// /* 🔒 Protected Route Wrapper */
// function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" replace />;
// }

// function App() {
//   return (
//     <Router>
//       {/* Navbar shows only if logged in */}
//       {localStorage.getItem("token") && <Navbar />}

//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Login />} />
//         <Route path="/verify" element={<VerifySignature />} />

//         {/* Protected */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/document/:id"
//           element={
//             <ProtectedRoute>
//               <DocumentView />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/audit/:documentId"
//           element={
//             <ProtectedRoute>
//               <AuditLogs />
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 */}
//         <Route path="*" element={<h2>404 Page Not Found</h2>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
