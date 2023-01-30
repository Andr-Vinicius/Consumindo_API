import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


// eslint-disable-next-line import/no-anonymous-default-export
export default reducers => {
  // Armazenamento do estado no Local Storage do navegador (por padrão)
  const persistedReducers = persistReducer(
    {
      key: 'CONSUMO_API',
      storage,
      whitelist: ['auth'], // Pode ir adicionando outros reducers
    }, 
    reducers
  );

  return persistedReducers;
}