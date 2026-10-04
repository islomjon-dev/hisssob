import { Link } from 'react-router-dom';
import { BarChart3, Calculator, Settings, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { useNavigate } from 'react-router-dom';

export default function MorePage() {
  const { language, currentUser, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/reports', icon: BarChart3, label: t('reports', language) },
    { to: '/calculator', icon: Calculator, label: t('calculator', language) },
    { to: '/settings', icon: Settings, label: t('settings', language) },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Ko'proq</h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <User size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser?.firstName} {currentUser?.lastName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {menuItems.map((item, idx) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              idx < menuItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
            }`}
          >
            <item.icon size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-medium rounded-xl text-sm">
        <LogOut size={18} /> {t('logout', language)}
      </button>
    </div>
  );
}
