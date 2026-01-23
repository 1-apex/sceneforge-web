import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Landing";
import Examples from "./pages/Examples";
import RubikExampleApp from "./examples/rubik/App";
import AlphabetExampleApp from "./examples/alphabet/App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/examples" element={<Examples />} />
      <Route path="/examples/rubik" element={<RubikExampleApp />} />
      <Route path="/examples/alphabet" element={<AlphabetExampleApp />} />

      {/* optional */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
