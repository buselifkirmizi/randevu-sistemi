import { useState } from 'react';
import '../css/AdminLogin.css';
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
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Yönetim Paneli</h1>
        <p className="subtitle">Lütfen giriş bilgilerinizi giriniz</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="admin-submit" type="submit" disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
          {error && <div className="admin-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;