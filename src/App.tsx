// Main frontend app shell and route configuration.
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import KnowledgeBase from "./pages/KnowledgeBase";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import Agents from "./pages/Agents";
import AgentDetails from "./pages/AgentDetails";
import Knowledge from "./pages/Knowledge";
import KnowledgeDetails from "./pages/KnowledgeDetails";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/builder"
        element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/knowledge-base"
        element={
          <ProtectedRoute>
            <KnowledgeBase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playground"
        element={
          <ProtectedRoute>
            <Playground />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agents"
        element={
          <ProtectedRoute>
            <Agents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/agents/:id"
        element={
          <ProtectedRoute>
            <AgentDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/knowledge"
        element={
          <ProtectedRoute>
            <Knowledge />
          </ProtectedRoute>
        }
      />

      <Route
        path="/knowledge/:id"
        element={
          <ProtectedRoute>
            <KnowledgeDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
