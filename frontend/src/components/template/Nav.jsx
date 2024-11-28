import './Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default props =>
<aside className="menu-area">
    {/* Refatorar em casa*/}
    <Link to="/">
        <i className="fa fa-home"></i> Inicio
    </Link>
    <Link to="/users">
        <i className="fa fa-users"></i> Usuários 
    </Link>
    <Link to="/numeros">
        <i className="fa fa-users"></i> Todos Números 
    </Link>
    <Link to="/vendedor">
        <i className="fa fa-users"></i> Cadastrar vendedor 
    </Link>
    <Link to="/numeros-por-usuarios">
        <i className="fa fa-users"></i> Números por usuarios 
    </Link>
</aside>