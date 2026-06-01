import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Landing = lazy(() => import("./Landing"));
const Examples = lazy(() => import("./pages/Examples"));
const RubikExampleApp = lazy(() => import("./examples/rubik/App"));
const AlphabetExampleApp = lazy(() => import("./examples/alphabet/App"));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/examples/rubik" element={<RubikExampleApp />} />
        <Route path="/examples/alphabet" element={<AlphabetExampleApp />} />

        {/* optional */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
