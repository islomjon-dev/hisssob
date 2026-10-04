import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { t } from '../i18n/translations';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register, language } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || "Xatolik");
      }
    } else {
      if (!firstName || !lastName || !email || !password) {
        setError("Barcha maydonlarni to'ldiring");
        return;
      }
      if (password !== confirmPassword) {
        setError("Parollar mos kelmadi");
        return;
      }
      if (password.length < 6) {
        setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
        return;
      }
      const result = register({ firstName, lastName, email, password });
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || "Xatolik");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">HISSOB</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Hisob-kitob ilovasi</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {isLogin ? t('loginTitle', language) : t('registerTitle', language)}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('firstName', language)}</label>
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('lastName', language)}</label>
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('email', language)}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('password', language)}</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" required />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('confirmPassword', language)}</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
              </div>
            )}

            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm">
              {isLogin ? t('login', language) : t('register', language)}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              {isLogin ? t('noAccount', language) : t('hasAccount', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
