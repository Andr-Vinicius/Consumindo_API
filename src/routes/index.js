import React from "react";
import { Switch } from 'react-router-dom'

import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';
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
      <MyRoute exact path='/' component={Alunos} isClosed={false}/>
      <MyRoute exact path='/aluno/:id/edit' component={Aluno} isClosed/>
      <MyRoute exact path='/aluno/:id/delete' component={Aluno} isClosed/>
      <MyRoute exact path='/aluno/' component={Aluno} isClosed/>
      <MyRoute exact path='/fotos/:id' component={Fotos} isClosed/>
      <MyRoute exact path='/login/' component={Login} isClosed={false}/>
      <MyRoute exact path='/register/' component={Register} isClosed={false}/>
      <MyRoute path='*' component={Error404}/>
    </Switch>
  )
}
