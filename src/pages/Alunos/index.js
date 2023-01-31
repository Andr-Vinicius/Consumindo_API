import React, { useEffect, useState } from 'react';
import {get} from 'lodash';
import {FaUserCircle, FaEdit, FaWindowClose, FaExclamation} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {Title, AlunoContainer, ProfilePicture, NovoAluno} from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';

import axios from '../../services/axios';
import { toast } from 'react-toastify';

import history from '../../services/history';


export default function Alunos(){

  // Retorna o valor e uma função para setar esse valor
  const [Alunos, setAlunos] = useState([]); //Recebe um parâmetro do valor que você tá buscando
  const [isLoading, setIsLoading] = useState(false);
  // Pegando os dados da API
  useEffect(()=>{
    async function getAlunos(){
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getAlunos();
  }, []);

  function handleConfirm(e){
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();


  }

  async function handleDelete(e, id, index){
    e.persist();
    try{
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...Alunos];
      novosAlunos.splice(index, 1)
      setAlunos(novosAlunos);
      setIsLoading(false);
    }catch(err){
      const status = get(err, 'response.status', 0);
      if(status === 401){
        toast.error('Você precisa fazer login');
        return history.push('/login');
      }else{
        toast.error('Erro desconhecido')
      }
      setIsLoading(false);
    }
  }


  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Alunos</Title>
      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>
      <AlunoContainer>
      {Alunos.map((aluno, index) => (
        <div key={String(aluno.id)}>
          <ProfilePicture>
            {get(aluno, 'Fotos[0].url', false) ? (
              <img crossOrigin='' src={aluno.Fotos[0].url} alt="Imagem de Perfil"/>
            ) : (
              <FaUserCircle size={36} />
            )}
          </ProfilePicture>

          <span>{aluno.nome}</span>
          <span>{aluno.email}</span>

          <Link className='icon' to={`/aluno/${aluno.id}/edit`}><FaEdit size={16}/></Link>
          <Link className='icon' onClick={handleConfirm} to={`/aluno/${aluno.id}/delete`}><FaWindowClose size={16}/></Link>
          <FaExclamation onClick={e => handleDelete(e, aluno.id, index)} className='icon' size={16} display='none' cursor='pointer'/>
        </div>
      ))}
      </AlunoContainer>
    </Container>
  )
}
