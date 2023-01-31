import styled from "styled-components";


// Não é o default
export const Title = styled.h1`
  //color: ${props => props.isRed ? `red` : `blue`}
  text-align: center;
  font-size: 20pt;

`;

export const Form = styled.form`
  label{
    width: 160px;
    height: 160px;
    display: flex;
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    background-color: #eee;
    border: 3px dashed ${props=>props.theme.colors.primary};
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  img{
    width: 160px;
    height: 160px;
  }

  input{
    display: none;
  }
`;

