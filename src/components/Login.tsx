import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Bitte Benutzername und Passwort eingeben');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Ungültige Anmeldedaten');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Zeiterfassung APP</h1>
        <h2>Anmeldung</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Benutzername:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Benutzername"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary">
            Anmelden
          </button>
        </form>
        <div className="demo-credentials">
          <p><strong>Demo-Zugänge:</strong></p>
          <p>admin / admin123</p>
          <p>user / user123</p>
          <p>demo / demo123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
