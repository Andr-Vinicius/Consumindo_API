import styled from "styled-components";

export const Nav = styled.nav`
  min-width: 100%;
  max-width: 100%;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: center;


  a{
    color: white;
    margin: 0 20px 0;
    font-weight: bold;
    :hover{
      color: ${props=>props.theme.colors.hoverStyle};
    }
  }
`;

export const Elemento = styled.h4`
  width: 100%;
  color: white;
  margin-inline-start: 50%;
`;
