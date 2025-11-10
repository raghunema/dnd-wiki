import React, { use, useEffect, useState } from "react";
import "./login.css"; // import the CSS styles
import { login, requestMagicLink, verifyMagicLink } from '../../backendCalls/api'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //check if this is a maigc link on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') 
    console.log(token)

    if (token){
      verifyMagicLinkToken(token)
    }

  }, [])

  const verifyMagicLinkToken = async (token) => {
    try { 
      const verifiedUser = await verifyMagicLink({token})

      console.log(verifiedUser)
      
      localStorage.setItem('token', verifiedUser.token)
      localStorage.setItem('user', JSON.stringify(verifiedUser.user))

      navigate('../admin', {replace: true})

    } catch (err) {
      console.log(err)
      
      setError(err.message) 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({username, password})
      console.log(res)

      console.log('in login page')
      console.log(res)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))

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

  const handleMagicLinkRequest = async (e) => {
    setEmailSent(false)
    setError("")

    try {
      if(!email.trim()){
        setError("Please write an email")
        return;
      }

      const emailSent = await requestMagicLink({email})
      setLoading(true)

      if(emailSent.ok) {
        setEmailSent(true)
        setLoading(false)
        setError(false)
      }
    } catch (err) {
      setEmailSent(false)
      setLoading(false)
      setError(false)
    }

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type='button' onClick={handleLogout}>
          LogOut
        </button>
      </form>

      <div>
        <input
          type='text'
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='button' onClick={handleMagicLinkRequest}>
          Get email magic Link
        </button>
        <div>{emailSent ? <p>Please check your email!</p> : ""}</div>
      </div>

      {error && <div className="error"><h4>{error}</h4></div>}
    </div>
  );
}
