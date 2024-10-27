import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';  
import './App.css';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
}

const App =() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const handleLogin = async () => {
    try {
      await fetch('http://localhost:5000/api/csrf-token', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const csrfToken = Cookies.get('X-CSRF-Token');
  
      
      if (!csrfToken) {
        throw new Error('CSRF token not found');
      }
  
      const loginResponse = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,  
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      if (!loginResponse.ok) {
        const loginData = await loginResponse.json();
        throw new Error('Login failed: ' + (loginData.message || 'Unknown error'));
      }
  
      console.log('Login successful');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error:', error);
      setError((error as Error).message);
    }
  };
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await fetch('http://localhost:5000/users/profile', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData: UserProfile = await profileResponse.json();
        setUserProfile(profileData);
        console.log('User Profile:', profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError((error as Error).message);
      }
    };

    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]); 

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
       Prihlasit sa
      </button>

      {userProfile && (
        <div className="user-profile">
          <h2>Profil používateľa</h2>
          <p>Krstné meno: {userProfile.firstName}</p>
          <p>Priezvisko: {userProfile.lastName}</p>
          <p>Email: {userProfile.email}</p>
          <p>Role: {userProfile.roles}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
