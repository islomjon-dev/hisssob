import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { formatCurrency } from '../utils/format';

export default function ReportsPage() {
  const { calculations, language } = useStore();

  const dailyData = useMemo(() => {
    const last7Days: { date: string; total: number; count: number; discount: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' });
      const dayCalcs = calculations.filter(c => {
        const cDate = new Date(c.createdAt);
        return cDate.toDateString() === date.toDateString();
      });
      last7Days.push({
        date: dateStr,
        total: dayCalcs.reduce((sum, c) => sum + c.finalTotal, 0),
        count: dayCalcs.length,
        discount: dayCalcs.reduce((sum, c) => sum + c.discountAmount, 0),
      });
    }
    return last7Days;
  }, [calculations]);

  const monthlyData = useMemo(() => {
    const last6Months: { date: string; total: number; count: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toLocaleDateString('uz-UZ', { month: 'short' });
      const monthCalcs = calculations.filter(c => {
        const cDate = new Date(c.createdAt);
        return cDate.getMonth() === date.getMonth() && cDate.getFullYear() === date.getFullYear();
      });
      last6Months.push({
        date: monthStr,
        total: monthCalcs.reduce((sum, c) => sum + c.finalTotal, 0),
        count: monthCalcs.length,
      });
    }
    return last6Months;
  }, [calculations]);

  const summary = useMemo(() => {
    const totalRevenue = calculations.reduce((sum, c) => sum + c.finalTotal, 0);
    const totalDiscount = calculations.reduce((sum, c) => sum + c.discountAmount, 0);
    const totalSubtotal = calculations.reduce((sum, c) => sum + c.subtotal, 0);
    return { totalRevenue, totalDiscount, totalSubtotal, count: calculations.length };
  }, [calculations]);

  const hasData = calculations.length > 0;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('reports', language)}</h1>

      {!hasData ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noData', language)}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Hisobotlar uchun hisob-kitoblar yarating</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('totalCalculations', language)}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{summary.count}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('dailyTotal', language)}</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">{formatCurrency(summary.totalRevenue)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('totalDiscount', language)}</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-1">{formatCurrency(summary.totalDiscount)}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">Jami summa</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">{formatCurrency(summary.totalSubtotal)}</p>
            </div>
          </div>

          {/* Daily Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{t('chartDaily', language)}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                  />
                  <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">{t('chartMonthly', language)}</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
