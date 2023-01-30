import React from "react";
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import {toast} from 'react-toastify';


export default function MyRoute({component: Component, isClosed, ...rest}){
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Controle automático de Login

  // Verifica se a rota é fecha e se o usuário não está logado
  if(isClosed && !isLoggedIn){
    toast.warning('Você deve estar logado para poder alterar algum aluno...')
    return (
      // Irá redirecionar o usuário para a página de login
      <Redirect to={{
        pathname: '/login',
        state:{
          prevPath: rest.location.pathname // Passa a rota que o usuário estava antes
        }
      }}/>
    );
  }

  return (
    <Route {...rest} component={Component}/>
  )
}

// Verificações das rotas com os PropTypes
MyRoute.defaultProps = {
  isClosed: false,
}

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
}
