import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ExamManagement } from "./components/ExamManagement";
import { MyResults } from "./components/MyResults";
import { ChatBot } from "./components/ChatBot";
import { Support } from "./components/Support";
import { FamilyManagement } from "./components/FamilyManagement";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam-management" element={<ExamManagement />} />
        <Route path="/my-results" element={<MyResults />} />
        <Route path="/family" element={<FamilyManagement />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}