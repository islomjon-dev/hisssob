import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Toast from './components/Toast';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import NewCalculation from './pages/NewCalculation';
import HistoryPage from './pages/HistoryPage';
import CalculationDetail from './pages/CalculationDetail';
import ProductsPage from './pages/ProductsPage';
import ReportsPage from './pages/ReportsPage';
import CalculatorPage from './pages/CalculatorPage';
import SettingsPage from './pages/SettingsPage';
import MorePage from './pages/MorePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useStore();

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/new" element={<ProtectedRoute><NewCalculation /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
      <Route path="/history/:id" element={<ProtectedRoute><CalculationDetail /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/more" element={<ProtectedRoute><MorePage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeWrapper>
        <Toast />
        <AppRoutes />
      </ThemeWrapper>
    </HashRouter>
  );
}
