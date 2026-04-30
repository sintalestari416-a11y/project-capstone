import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import Analytics from './pages/Analytics';
import Rankings from './pages/Rankings';
import ViolationsPage from "./pages/ViolationsPage";

// 🔥 TAMBAHAN
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />

        {/* 🔒 ADMIN ONLY */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/violations"
          element={
            <ProtectedRoute>
              <ViolationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rankings"
          element={
            <ProtectedRoute>
              <Rankings />
            </ProtectedRoute>
          }
        />
      </Route>

    </Routes>
  );
}

export default App;