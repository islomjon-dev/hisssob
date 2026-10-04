import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { formatCurrency, formatDateTime, isToday, isYesterday, isThisWeek, isThisMonth } from '../utils/format';

type FilterType = 'all' | 'today' | 'yesterday' | 'week' | 'month';

export default function HistoryPage() {
  const { calculations, language } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredCalcs = useMemo(() => {
    let result = [...calculations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply filter
    switch (filter) {
      case 'today':
        result = result.filter(c => isToday(c.createdAt));
        break;
      case 'yesterday':
        result = result.filter(c => isYesterday(c.createdAt));
        break;
      case 'week':
        result = result.filter(c => isThisWeek(c.createdAt));
        break;
      case 'month':
        result = result.filter(c => isThisMonth(c.createdAt));
        break;
    }

    // Apply search
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(c =>
        c.items.some(item => item.productName.toLowerCase().includes(s)) ||
        c.id.toLowerCase().includes(s)
      );
    }

    return result;
  }, [calculations, filter, search]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('all', language) },
    { key: 'today', label: t('today', language) },
    { key: 'yesterday', label: t('yesterday', language) },
    { key: 'week', label: t('week', language) },
    { key: 'month', label: t('month', language) },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('history', language)}</h1>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('search', language)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {filteredCalcs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noCalculations', language)}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCalcs.map(calc => (
            <Link
              key={calc.id}
              to={`/history/${calc.id}`}
              className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {calc.items.map(i => i.productName).join(', ')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDateTime(calc.createdAt)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {calc.id.slice(0, 8)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(calc.finalTotal)}</p>
                  {calc.discountAmount > 0 && (
                    <p className="text-xs text-orange-500 mt-0.5">-{formatCurrency(calc.discountAmount)}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{formatCurrency(calc.subtotal)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
