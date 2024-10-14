import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://trello-clone-latest.onrender.com/api/csrf-token', {
        method: 'GET', // alebo 'POST', ak to tvoj endpoint vyžaduje
        headers: {
          'Content-Type': 'application/json',
          // Pridaj ďalšie hlavičky, ak sú potrebné (napr. Authorization)
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('CSRF token:', data); // Tu môžeš spracovať token
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
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
