import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";
import Numeros from "../components/numeros/Numeros"
import Erro404 from "../components/404/Erro404";
import Vendedor from "../components/numeros/Vedendor";
import NumerosPorUser from "../components/numeros/NumeroPorUser";
import Testeapi from '../components/numeros/Testeapi';

export default props => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/users' element={<UserCrud />} />
        <Route exact path='/numeros' element={<Numeros />} />
        <Route exact path='/vendedor' element={<Vendedor />} />
        <Route exact path='/numeros-por-usuarios' element={<NumerosPorUser />} />
        <Route exact path='/testapi' element={<Testeapi />} />
        <Route exact path='*' element={ <Erro404 />}/>
    </Routes>
);
