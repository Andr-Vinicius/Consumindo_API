import React from "react";
import { Switch } from 'react-router-dom'
import { toast } from "react-toastify";

import Login from '../pages/Login';
import Error404 from '../pages/Error404';

import MyRoute from "./MyRoute";

export default function Routes(){
  //Essas são as principais função dos toasts:
  //  toast.success("Sucesso");
  //  toast.error("ERRO");
  //  toast.warning("Tem certeza disso??");
  //  toast.info("As informações são as seguintes: blábláblá!")
  return(
    <Switch> {/* Encerra a busca pela rota quando ela é encontrada */}
      {/* Esse MyRout é uma rota personalizada */}
      <MyRoute exact path='/' component={Login}/>
      <MyRoute path='*' component={Error404}/>
    </Switch>
  )
}
