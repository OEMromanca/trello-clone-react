// App.tsx
import React, { useState } from 'react';
import './App.css';

const getCookie = (name: string): string | undefined => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
};

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    try {
      // Získanie CSRF tokenu
      const tokenResponse = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Umožni odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!tokenResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const tokenData = await tokenResponse.json();
      console.log('CSRF token:', tokenData.csrfToken);
      setCsrfToken(tokenData.csrfToken); // Uloženie tokenu do stavu

      // Získaj CSRF token z cookie
      const csrfTokenFromCookie = getCookie('XSRF-TOKEN');
      if (!csrfTokenFromCookie) {
        throw new Error('CSRF token is not available');
      }

      const loginResponse = await fetch('https://trello-clone-latest.onrender.com/users/login', {
        method: 'POST',
        credentials: 'include', // Umožni odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfTokenFromCookie, // Pridanie CSRF tokenu do hlavičiek
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      const loginData = await loginResponse.json();
      console.log('Login successful:', loginData); // Tu môžeš spracovať odpoveď pri úspešnom prihlásení

    } catch (error) {
      console.error('Error:', error);
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
