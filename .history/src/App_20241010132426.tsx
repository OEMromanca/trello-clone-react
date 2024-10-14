import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Získaj CSRF token
      const tokenResponse = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Povoliť odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!tokenResponse.ok) {
        throw new Error('Network response was not ok');
      }

      // Získaj token z cookies
      const csrfToken = getCookie('XSRF-TOKEN');

      // Skontroluj, či je token definovaný
      if (!csrfToken) {
        throw new Error('CSRF token is not available');
      }

      const loginResponse = await fetch('https://trello-clone-latest.onrender.com/users/login', {
        method: 'POST',
        credentials: 'include', // Povoliť odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Použiť CSRF token
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      const loginData = await loginResponse.json();
      console.log('Login successful:', loginData);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Funkcia na získanie cookie podľa názvu
  const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
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
