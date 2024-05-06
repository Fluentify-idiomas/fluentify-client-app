import { useState } from "react";
import "./style.scss";

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    
    console.log(`email ${email}`);
    console.log(`password ${password}`);
  };

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text');
    } else {
       setIcon(eyeOff);
       setType('password');
    }
  }

  return (
    <div className="login-page-container">
      <header className="login-page-header">
        <a href="/">Voltar</a>
      </header>
      <h1 className="logo">Fluentify</h1>
      <div className="login-form-container">
        <h2 className="login-form-title">Entre em sua conta</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-fieldset-container">
            <fieldset className="email-container">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="password-container">
              <div>
                <input
                  type={type}
                  name="password"
                  id="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="password-eye" onClick={handleToggle}>
                  <Icon icon={icon}></Icon>
                </span>
              </div>
            </fieldset>
          </div>
          <button className="submit-button" type="submit">Entrar</button>
          <div className="forgot-password">
            <p>Esqueceu sua senha ? <a href="">Recupere aqui</a></p>
          </div>
          <div className="register-account">
            <p>Não tem conta ?</p>
            <a href="/register">Faça o Cadastro</a>
          </div>
        </form>
      </div>
    </div>
  );
}
