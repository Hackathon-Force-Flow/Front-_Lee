import { Routes, Route, Navigate } from "react-router-dom";

import OfficerMain from "./pages/officer/officer_main/officer_main";
import OfficerDashboard from "./pages/officer/officer_dashboard/officer_dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/officer/dashboard" replace />} />
      <Route path="/officer/main" element={<OfficerMain />} />
      <Route path="/officer/dashboard" element={<OfficerDashboard />} />
    </Routes>
  );
}

export default App;
