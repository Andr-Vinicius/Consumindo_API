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

export const AlunoContainer = styled.div`
  margin-top: 20px;
  div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    +div{
      border-top: 1px solid ${props => props.theme.colors.primary};
    }
    .icon{
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export const ProfilePicture = styled.div`
  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

