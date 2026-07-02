import { useState } from 'react';
import { login } from '../api/appointments';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      localStorage.setItem('adminToken', data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-serif font-bold text-stone-900">Yönetim Paneli</h1>
        <p className="mt-2 text-center text-sm text-stone-600">Lütfen giriş bilgilerinizi giriniz</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border border-stone-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-stone-700">Kullanıcı Adı</label>
              <div className="mt-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-stone-200 rounded-xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">Şifre</label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-4 py-3 border border-stone-200 rounded-xl shadow-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 mt-4">
                <p className="text-sm text-red-700 text-center font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;