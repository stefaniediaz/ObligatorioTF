import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/login.css';

const Login = ({ history }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleUsuario = ({ target: { value } }) => setUsuario(value);
  const handlePassword = ({ target: { value } }) => setPassword(value);

  const handleSubmit = event => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario, password: password }),
    };

    fetch('http://xpense.develotion.com/login.php', requestOptions)
      .then(response => response.json())
      .then(({ codigo, apiKey }) => {
        if (codigo === 200) {
          sessionStorage.setItem('apiKey', apiKey);
          history.push('/todolist');
        } else {
          sessionStorage.removeItem('apiKey');
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="usuario">Usuario: </label>
        <input type="text" name="usuario" value={usuario} onChange={handleUsuario} />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" value={password} onChange={handlePassword} />
        <input type="submit" value="Ingresar" />
      </form>
    </div>
  );
};

Login.propTypes = {};

export default withRouter(Login);
