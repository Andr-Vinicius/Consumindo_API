import React, {useState, useEffect} from 'react';
import {isEmail} from 'validator';

import {Title, Form} from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import {toast} from 'react-toastify';


import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';


export default function Register(){
  const id = useSelector(state => state.auth.user.id);
  const nomeStorage = useSelector(state => state.auth.user.nome);
  const emailStorage = useSelector(state => state.auth.user.email);
  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
    if(!id) return;
    setNome(nomeStorage);
    setEmail(emailStorage);
  }, [emailStorage, id, nomeStorage]);

  async function handleSubmit(e){
    e.preventDefault();
    let formErrors = false;

    // Validações, economizando o back-end
    if(nome.length < 3 || nome.length > 255){
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if(!id){
      if(password.length < 6 || password.length > 50){
        formErrors = true;
        toast.error('Senha deve ter entre 6 e 50 caracteres');
      }
    }

    // Uso do validator para o email
    if(!isEmail(email)){
      formErrors = true;
      toast.error('Email inválido!');
    }

    if(formErrors) return;

    dispatch(actions.registerRequest({nome, email, password, id}));

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>{!id ? 'Crie a sua conta' : 'Edite sua conta'}</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor='nome'>
          Nome:
          <input 
            type="text" 
            value={nome} 
            placeholder="Seu nome"
            onChange={e => setNome(e.target.value)}/>
        </label>
        <label htmlFor='email'>
          Email:
          <input 
            type="text" 
            value={email} 
            placeholder="Seu email"
            onChange={e => setEmail(e.target.value)}/>
        </label>
        <label htmlFor='password'>
          Password:
          <input 
            type="text" 
            value={password} 
            placeholder="Sua senha"
            onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type='submit'>Salvar</button>

      </Form>
    </Container>
  )
}
