import React from "react";
import Main from "../template/Main";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopupExample = () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);
export default props =>
    <Main icon="home" title="Inicio" subtitle="segundo projeto react" >
        <div className="display-4">Bem Vindo!</div>
           <hr />
         <p className="mb-0"> Sistema para exemplificar a construção de um cadastro
            desenvolvido em React!
            <PopupExample />
        </p>    
    </Main>