import React, {useState, useEffect} from 'react';
import {Title, ProfilePicture} from './styled';
import { Container } from '../../styles/GlobalStyles';
import {get} from 'lodash';
import PropTypes from 'prop-types';
import {Form} from '../Register/styled';
import {toast} from 'react-toastify';
import {isEmail, isInt, isFloat} from 'validator';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import {FaUserCircle, FaEdit} from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function Aluno({match}){
  const dispach = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if(!id) return;
    async function getAluno(){
      try{
        setIsLoading(true);
        const {data} = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');
        setFoto(Foto);

        setIsLoading(false);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setAltura(data.altura);
        setPeso(data.peso);

      }catch(err){
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if(status === 400){
          errors.map(error => toast.error(error));
          history.push('/');
        }
      }
    }
    getAluno();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    let formErrors = false;

    if(nome.length < 3 || nome.length > 255){
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if(sobrenome.length < 3 || sobrenome.length > 255){
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }

    if(!isEmail(email)){
      formErrors = true;
      toast.error('Email inválido!');
    }

    if(!isInt(String(idade))){
      formErrors = true;
      toast.error('Idade precisa ser um número inteiro');
    }

    if(!isFloat(String(peso))){
      formErrors = true;
      toast.error('Peso precisa ser um número inteiro ou decimal');
    }

    if(!isFloat(String(altura))){
      formErrors = true;
      toast.error('Altura precisa ser um número inteiro ou decimal');
    }


    if(formErrors) return;

    try{
      setIsLoading(true);
      if(id){
        // Editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('Aluno(a) editado com sucesso!');
      }else{
        // Criando
        const {data} = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          altura,
          peso,
        });
        toast.success('Aluno(a) criado com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    }catch(erro){
      const status = get(erro, 'response.status', 0);
      const data = get(erro, 'response.data', {});
      const errors = get(data, 'errors', []);
    
      if(errors.length > 0) {
        errors.map(error => toast.error(error));
      }else{
        toast.error('Erro desconhecido');
      }

      if(status === 401) dispach(actions.loginFailure());

    }

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>
      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} />
          ) : (
            <FaUserCircle size={160} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
      <label htmlFor='nome'>
          Nome:
          <input 
            type="text" 
            value={nome} 
            placeholder="Seu nome"
            onChange={e => setNome(e.target.value)}/>
        </label>
      <label htmlFor='sobrenome'>
          Sobreome:
          <input 
            type="text" 
            value={sobrenome} 
            placeholder="Seu sobrenome"
            onChange={e => setSobrenome(e.target.value)}/>
        </label>
        <label htmlFor='email'>
          Email:
          <input 
            type="text" 
            value={email} 
            placeholder="Seu email"
            onChange={e => setEmail(e.target.value)}/>
        </label>
        <label htmlFor='idade'>
          Idade:
          <input 
            type="number" 
            value={idade} 
            placeholder="Sua idade"
            onChange={e => setIdade(e.target.value)}/>
        </label>
        <label htmlFor='peso'>
          Peso:
          <input 
            type="number" 
            value={peso} 
            placeholder="Seu peso"
            onChange={e => setPeso(e.target.value)}/>
        </label>
        <label htmlFor='altura'>
          Altura:
          <input 
            type="number" 
            value={altura} 
            placeholder="Sua altura"
            onChange={e => setAltura(e.target.value)}/>
        </label>
        <button type='submit'>Salvar</button>
      </Form>
    </Container>
  )
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
}
