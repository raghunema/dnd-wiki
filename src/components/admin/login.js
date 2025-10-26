import React, { useState } from "react";
import "./login.css"; // import the CSS styles
import { login } from '../../backendCalls/api'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({username, password})
      console.log(res)

      if (!res.ok) throw new Error(res.message || "Login failed");

      const data = await res.json();
      console.log('in login page')
      console.log(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // success logic here (e.g., redirect)
      console.log("Login success:", res);
      navigate('../admin')

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('./')
  }

  return (
    <div style={{minHeight: '100vh'}}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type='button' onClick={handleLogout}>
          LogOut
        </button>
      </form>
    </div>
  );
}
