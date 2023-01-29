import React from "react";
import { Nav } from "./styled";
import {FaSignInAlt, FaUserAlt} from 'react-icons/fa'
import { Link } from "react-router-dom";



export default function Header(){

  return (
    <Nav>
      <Link to="/">Inicio</Link>
      {/*<Link to="/sobre">Sobre</Link>*/}
      <Link to="/login">
      <FaSignInAlt className="icon" size={20} color={'white'} />
      </Link>
      <Link to="/register">
      <FaUserAlt className="icon" size={18} color={'white'}/>
      </Link>

    </Nav>
  )
}
