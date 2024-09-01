import '../assets/styles/Welcome.css'
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Welcome: React.FC = () => {

   
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Aquí puedes redirigir al usuario o hacer algo después del login
      } catch (err) {
        setError(err.message);
      }
    };




   // const { signIn } = UserAuth();






/* 

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // Validación del formato del correo electrónico
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(emailRef.current.value)) {
            setEmailError('El correo electrónico es inválido.');
            return;
        }
        setEmailError('');
        try {
          //  await signIn(emailRef.current.value, passwordRef.current.value).then((response:any)=>{
                navigate('/account')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            });
        } catch (e:any)  {
          if(e.code === 'auth/invalid-email'){
            setError('El correo electrónico es inválido')
          }else if(e.code === 'auth/user-not-found'){
            setError('El usuario no existe')
          }else if(e.code === 'auth/wrong-password'){
            setError('La contraseña es incorrecta')
          }else{
            setError(e.message)
          }
        }
    };
     */
  


  return (
    <div className="full-screen-container">
    <div className="login-container">
      <h1 className="login-title">Dragones</h1>
      <form className="form"/*  onSubmit={handleSubmit} */>
        <div className="input-group success" >
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef}/>
          <span className="msg">Valid email</span>
        </div>

        <div className="input-group error" >
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passwordRef}/>
          <span className="msg">Incorrect password</span>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  </div>
  );
};

export default Welcome; 















const Login = () => {
