import { useState } from "react";
import "./style.scss";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { maskCpf } from "@/utils/helpers";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);

  const [passwordConfirmType, setPasswordConfirmType] = useState("password");
  const [passwordConfirmIcon, setPasswordConfirmIcon] = useState(eyeOff);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    console.log(`email ${email}`);
    console.log(`password ${password}`);
  };

  const handleTogglePassword = () => {
    if (passwordType === "password") {
      setPasswordIcon(eye);
      setPasswordType("text");
    } else {
      setPasswordIcon(eyeOff);
      setPasswordType("password");
    }
  };

  const handleToggleConfirmPassword = () => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmIcon(eye);
      setPasswordConfirmType("text");
    } else {
      setPasswordConfirmIcon(eyeOff);
      setPasswordConfirmType("password");
    }
  };

  return (
    <div className="register-page-container">
      <header className="register-page-header">
        <a href="/">Voltar</a>
      </header>
      <h1 className="logo">Fluentify</h1>
      <div className="register-form-container">
        <h2 className="register-form-title">Crie uma nova conta</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-fieldset-container">
            <fieldset className="email-container">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset className="password-container">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="form-fieldset-container">
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gênero</option>
              <option value="fame">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            <fieldset className="password-container">
              <input type="date" />
            </fieldset>
          </div>
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
            <fieldset className="email-container">
              <input
                type="text"
                name="cpf"
                id="cpf"
                placeholder="CPF"
                value={cpf}
                maxLength={14}
                onChange={(e) => setCpf(maskCpf(e.target.value))}
              />
            </fieldset>
          </div>
          <div className="form-fieldset-container">
            <fieldset className="password-container">
              <div>
                <input
                  type={passwordType}
                  name="password"
                  id="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="password-eye" onClick={handleTogglePassword}>
                  <Icon icon={passwordIcon}></Icon>
                </span>
              </div>
            </fieldset>
            <fieldset className="password-container">
              <div>
                <input
                  type={passwordConfirmType}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirmação de Senha"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <span
                  className="password-eye"
                  onClick={handleToggleConfirmPassword}
                >
                  <Icon icon={passwordConfirmIcon}></Icon>
                </span>
              </div>
            </fieldset>
          </div>
          <button className="submit-button" type="submit">
            Cadastrar
          </button>
          <div className="register-account">
            <p>Já tem conta ?</p>
            <a href="/login">Faça o Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
