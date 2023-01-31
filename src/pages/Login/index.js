import React, {useState} from 'react';
import {Title} from './styled';
import { Container } from '../../styles/GlobalStyles';
import { Form } from '../Register/styled';
import Loading from '../../components/Loading';

import {toast} from 'react-toastify';
import {isEmail} from 'validator';
import {get} from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props){
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    let formErrors = false;

    if(password.length < 6 || password.length > 50){
      formErrors = true;
      toast.error('Senha inválida!');
    }

    // Uso do validator para o email
    if(!isEmail(email)){
      formErrors = true;
      toast.error('Email inválido!');
    }

    if(formErrors) return;

    dispatch(actions.loginRequest({email, password, prevPath}));

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
      <label htmlFor='email'>
          Email:
          <input 
            type="text" 
            value={email} 
            placeholder="Seu email"
            onChange={e => setEmail(e.target.value)}/>
        </label>
        <label htmlFor='password'>
          Senha:
          <input 
            type="text" 
            value={password} 
            placeholder="Sua senha"
            onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type='submit'>Entrar</button>
      </Form>
    </Container>
  )
}
