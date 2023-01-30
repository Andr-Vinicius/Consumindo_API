// Importações provenientes do React
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

// Importações do código
import store, {persistor} from "./store"; // Funcionalidades do Redu (Saga e Persist)
import GlobalStyles from "./styles/GlobalStyles"; // Estilos globais
import {theme} from './config/colors'; // Cores globais

import Header from "./components/Header"; // Componentes

import Routes from './routes'; // Rotas
import history from "./services/history"; 



function App() {
  return (
    <PersistGate persistor={persistor}> {/* Responsável por manter o estado ao recarregar o Browser */}
      <Provider store={store}>
        <Router history={history}>
          <ThemeProvider theme={theme}> {/* Configuração das cores da paleta escolhida */}
            <Header />
            <Routes />
            <GlobalStyles />
            {/* Configuração dos pop-ups com mensagens e tipos especificos, 
            configurei para 1000 milissegundos o  tempo de fechamento e para não pausar quando o mouse estiver em cima */}
            <ToastContainer autoClose={2100} pauseOnHover={false} className="toast-container"/> 
          </ThemeProvider>
        </Router>
      </Provider>
    </PersistGate>
  );
}

export default App;
// ThemeProvider