import {all} from 'redux-saga/effects';
import auth from './auth/sagas';

// Função geradora, o yield acaba sendo uma espécie de await
export default function* rootSaga(){
  return yield all([auth]); // Roda e acumula em paralelo vários processos
}