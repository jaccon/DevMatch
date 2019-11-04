import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';
import api from '../services/api';

export default function Login({ history }) {

  const [ username, setUsername ] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    console.log(username);

    const response = await api.post('/devs', {
        username, 
    });

    const { _id } = response.data;

    console.log(_id);
    history.push(`/dev/${_id}`);
  }

  return (
      <div className="login-container">
          <form onSubmit={handleSubmit}>
            <img src={logo} alt="DevMatch" />
            <input 
                placeholder="Digite seu usuário do Github" 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <button type="submit"> Enviar </button>
          </form>
      </div>
  );
}
