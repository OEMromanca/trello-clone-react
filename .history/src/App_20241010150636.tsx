import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const handleLogin = async () => {
    try {
      // Získaj CSRF token
      const tokenResponse = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Umožňuje odosielanie cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!tokenResponse.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
  
      const tokenData = await tokenResponse.json();
      const token = tokenData.csrfToken; // Získanie tokenu
  
      console.log(token);
      
      // Prihlásenie
      const loginResponse = await fetch('https://trello-clone-latest.onrender.com/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': String(tokenData.csrfToken), // Pridanie CSRF tokenu do hlavičiek ako reťazec
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
