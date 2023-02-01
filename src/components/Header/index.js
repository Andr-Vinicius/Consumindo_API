import React from "react";
import { Nav } from "./styled";
import {FaSignInAlt, FaUserAlt, FaPowerOff} from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';



export default function Header(){
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  function handleLogout(e){
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/')
  }
  return (
    <Nav>
      <Link to="/">Inicio</Link>
      {/*<Link to="/sobre">Sobre</Link>*/}
      <Link to="/register">
      <FaUserAlt className="icon" size={18} color={'white'}/>
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
        <FaPowerOff className="icon" size={20} color={'#86A3A6'} />
        </Link>
      ) : (
        <Link to="/login">
        <FaSignInAlt className="icon" size={20} color={'white'} />
        </Link>
      )}


    </Nav>
  )
}
