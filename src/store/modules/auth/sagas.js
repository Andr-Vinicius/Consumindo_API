import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from '../types'


import {toast} from 'react-toastify'
import axios from '../../../services/axios';
import history from '../../../services/history';

import {get} from 'lodash';


function* loginRequest({payload}){
  try{
    const response = yield call(axios.post, '/tokens/', payload);
    yield put(actions.loginSuccess({...response.data}));

    toast.success('Login com sucesso.');
    
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(payload.prevPath);
  }catch(e){
    toast.error('Usuário ou senha inválidos!');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({payload}){
  const token = get(payload, 'auth.token', '');
  if(!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;

}

function* registerRequest({payload}){
  const {id, nome, email, password} = payload;

  try{
    if(id){
      // EDITAR
      if(password === ''){
        yield call(axios.put, '/users', {
          email,
          nome, 
        });  
        toast.success('Editado com sucesso!'); 
        yield put(actions.registerUpdatedSuccess({nome, email}));
      }else{
        yield call(axios.put, '/users', {
          email,
          nome, 
          password
        });
        toast.success('Conta editada com sucesso!'); 
        yield put(actions.registerUpdatedSuccess({nome, email, password}));
      }

    }else{
      // CRIAR
      yield call(axios.post, '/users', {
        email,
        nome, 
        password,
      });  
      toast.success('Conta criada com sucesso!'); 
      yield put(actions.registerCreatedSuccess({nome, email, password})); 
    }
  }catch(e){
    const errors = get(e, 'response.data.error', []);
    const status = get(e, 'response.status', 0);

    if(status === 401){
      toast.info('Você deve fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if(errors.length > 0){
      errors.map(error => toast.error(error));
    }else{
      toast.error('ERRO DESCONHECIDO');
    }

    yield put(actions.registerFailure());
  }

}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
])