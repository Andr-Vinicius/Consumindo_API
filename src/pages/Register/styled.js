import styled from "styled-components";


// Não é o default
export const Title = styled.h1`
  //color: ${props => props.isRed ? `red` : `blue`}
  text-align: center;
  font-size: 20pt;

`;

export const Paragrafo = styled.p`
  text-align: center;
  margin-top: 2em;
  color: black;
  font-size: 12pt;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  input{
    height: 30px;
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 4px;
    :focus{
      transform: scale(0.98);
      transition: all  0.5s;
    }

    &:focus{
      border: 1px solid ${props => props.theme.colors.primary};
    }
  }

`;

