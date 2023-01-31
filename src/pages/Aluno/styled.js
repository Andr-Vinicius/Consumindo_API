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

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 1em;
  img{
    width: 160px;
    height: 160px;
    border-radius: 50%;
  }

  a{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: white;
    background-color: ${props=>props.theme.colors.primary};
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

