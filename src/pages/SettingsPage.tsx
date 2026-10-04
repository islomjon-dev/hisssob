import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';
import { Language } from '../types';
import { LogOut, User, Globe, Moon, Sun, Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

export default function SettingsPage() {
  const { settings, updateSettings, currentUser, logout, language, showToast, calculations, products } = useStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExport = () => {
    const data = {
      calculations,
      products,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hissob-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Ma'lumotlar eksport qilindi", 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.calculations && data.products) {
          showToast("Import muvaffaqiyatli", 'success');
        } else {
          showToast("Noto'g'ri fayl formati", 'error');
        }
      } catch {
        showToast("Faylni o'qib bo'lmadi", 'error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('settings', language)}</h1>

      {/* Profile */}
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

      {/* Language */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{t('language', language)}</span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex gap-2">
            {(['uz', 'ru', 'en'] as Language[]).map(lang => (
              <button
                key={lang}
                onClick={() => updateSettings({ language: lang })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  settings.language === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {lang === 'uz' ? "O'zbekcha" : lang === 'ru' ? 'Русский' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {settings.theme === 'dark' ? <Moon size={18} className="text-gray-500" /> : <Sun size={18} className="text-gray-500" />}
            <span className="text-sm font-medium text-gray-900 dark:text-white">{t('theme', language)}</span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex gap-2">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                settings.theme === 'light'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Sun size={16} /> {t('light', language)}
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                settings.theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <Moon size={16} /> {t('dark', language)}
            </button>
          </div>
        </div>
      </div>

      {/* Export/Import */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <button onClick={handleExport} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
            <Download size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{t('exportData', language)}</span>
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 text-left">
            <Upload size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{t('importData', language)}</span>
          </button>
        </div>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-medium rounded-xl text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
        <LogOut size={18} /> {t('logout', language)}
      </button>
    </div>
  );
}
