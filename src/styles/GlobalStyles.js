import styled, { createGlobalStyle } from "styled-components";
import 'react-toastify/dist/ReactToastify.css'

// Definindo os estilos globais da aplicação
export default createGlobalStyle` // Estilo Global que está revestindo o App.js
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body{
    font-family: sans-serif;
    background-color: ${props => props.theme.colors.background}; // Pegando as cores temáticas do config
  }

  html, border-style, #root{
    height: 100%;
  }

  a{
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

`;

export const Container = styled.section`
  max-width: 490px;
  background-color: ${props => props.theme.colors.containerBackground};
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  button{
    cursor: pointer;
    display: block;
    margin-top: 1em;
    margin-left: auto;
    margin-right: auto;
    width: 85px;
    height: 28px;
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.colors.background};
    color: white;
    font-weight: bold;
    transition: all 200ms;
    :hover{
      background-color: ${props => props.theme.colors.hoverStyle};
      color: ${props => props.theme.colors.primary};
      font-weight: bold;
      transform: scale(1.1);
      transition: all 0.4s;  
      box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }
  }
`;
