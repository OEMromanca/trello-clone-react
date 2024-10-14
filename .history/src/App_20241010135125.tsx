import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('')
  

  const handleLogin = async () => {
    try {
      // Získať CSRF token
      const csrfResponse = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
        method: 'GET',
        credentials: 'include', // Zabezpečiť, že cookies sú zahrnuté v požiadavke
      });
  
      if (!csrfResponse.ok) {
        throw new Error('Failed to get CSRF token');
      }
  
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;
  
      // Prihlásenie s CSRF tokenom
      const loginResponse = await fetch('https://trello-clone-latest.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Zadaj CSRF token do hlavičky
        },
        credentials: 'include', // Zabezpečiť, že cookies sú zahrnuté v požiadavke
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
