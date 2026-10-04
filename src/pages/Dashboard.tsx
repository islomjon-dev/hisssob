import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Receipt, Percent } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { formatCurrency, formatDateTime, isToday } from '../utils/format';

export default function Dashboard() {
  const { currentUser, calculations, language } = useStore();

  const todayCalcs = calculations.filter(c => isToday(c.createdAt));
  const todayTotal = todayCalcs.reduce((sum, c) => sum + c.finalTotal, 0);
  const allTotal = calculations.reduce((sum, c) => sum + c.finalTotal, 0);
  const allDiscounts = calculations.reduce((sum, c) => sum + c.discountAmount, 0);
  const recentCalcs = [...calculations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('welcome', language)}, {currentUser?.firstName}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('dashboard', language)}</p>
        </div>
        <Link to="/new" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={18} />
          <span className="hidden sm:inline">{t('quickNew', language)}</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={<Receipt size={20} />} label={t('todayCalculations', language)} value={todayCalcs.length.toString()} color="blue" />
        <StatCard icon={<TrendingUp size={20} />} label={t('todayTotal', language)} value={formatCurrency(todayTotal)} color="green" />
        <StatCard icon={<Receipt size={20} />} label={t('allCalculations', language)} value={calculations.length.toString()} color="purple" />
        <StatCard icon={<Percent size={20} />} label={t('allDiscounts', language)} value={formatCurrency(allDiscounts)} color="orange" />
      </div>

      {/* Recent Calculations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-white text-sm">{t('recentCalculations', language)}</h2>
          <Link to="/history" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            {t('history', language)} →
          </Link>
        </div>
        {recentCalcs.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noCalculations', language)}</p>
            <Link to="/new" className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              <Plus size={16} /> {t('quickNew', language)}
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentCalcs.map(calc => (
              <Link key={calc.id} to={`/history/${calc.id}`} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {calc.items.map(i => i.productName).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatDateTime(calc.createdAt)}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(calc.finalTotal)}</p>
                  {calc.discountAmount > 0 && (
                    <p className="text-xs text-orange-500">-{formatCurrency(calc.discountAmount)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${colors[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5 truncate">{value}</p>
    </div>
  );
}
