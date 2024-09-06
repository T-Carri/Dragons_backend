// src/pages/Welcome.tsx
import '../assets/styles/Welcome.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store'; // Asegúrate de usar la ruta correcta
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authActions'; // Acción para el login

const Welcome: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados para los inputs del formulario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Extraer el estado de autenticación desde Redux
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFormError('Both email and password are required');
      return;
    }
    
    // Limpiar cualquier error previo y ejecutar el login
    setFormError('');
    dispatch(loginUser(email, password));
  };

  return (
    <div className="full-screen-container">
      <div className="login-container">
        <h1 className="login-title">Dragones</h1>
        
        {/* Mostrar error de formulario si existe */}
        {formError && <p className="error-message">{formError}</p>}
        
        {/* Mostrar error de login desde Redux si existe */}
        {error && <p className="error-message">Login failed: {error}</p>}
        
        <form className="form" onSubmit={handleSubmit}>
          {/* Grupo de entrada de correo */}
          <div className={`input-group ${email ? 'success' : 'error'}`}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <span className="msg">{email ? 'Valid email' : 'Please enter your email'}</span>
          </div>

          {/* Grupo de entrada de contraseña */}
          <div className={`input-group ${password ? 'success' : 'error'}`}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span className="msg">{password ? 'Password looks good' : 'Please enter your password'}</span>
          </div>

          {/* Botón de login, deshabilitado si está cargando */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
