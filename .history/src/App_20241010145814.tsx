import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const tokenResponse = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
          method: 'GET',
          credentials: 'include', // Umožňuje odosielanie cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!tokenResponse.ok) {
          throw new Error('Nepodarilo sa získať CSRF token');
        }

        const tokenData = await tokenResponse.json();
        console.log('CSRF token:', tokenData.csrfToken);
        setCsrfToken(tokenData.csrfToken);
      } catch (error) {
        console.error('Chyba pri získavaní CSRF tokenu:', error);
      }
    };

    fetchCsrfToken();
  }, []); // Tento efekt sa spustí len raz po načítaní komponentu

  const handleLogin = async () => {
    if (!csrfToken) {
      alert('CSRF token nebol načítaný.');
      return;
    }

    try {
      const loginResponse = await fetch('https://trello-clone-latest.onrender.com/users/login', {
        method: 'POST',
        credentials: 'include', // Umožňuje odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Použitie CSRF tokenu
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Prihlásenie zlyhalo');
      }

      const loginData = await loginResponse.json();
      console.log('Prihlásenie úspešné:', loginData); // Spracovanie odpovede pri úspešnom prihlásení
    } catch (error) {
      console.error('Chyba:', error);
// Informovať používateľa o chybe
    }
  };

  return (
    <div className="app-container">
      <h1>Prihlásenie</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Užívateľské meno"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Heslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleLogin} className="login-button">
        Prihlásiť sa
      </button>
    </div>
  );
}

export default App;
