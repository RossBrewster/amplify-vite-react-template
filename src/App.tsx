// src/App.tsx
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Authenticator.Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Authenticator>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Authenticator>
          }
        />
      </Routes>
    </Authenticator.Provider>
  );
}