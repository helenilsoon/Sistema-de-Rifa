import React from "react";
import Main from "../template/Main";
import './Erro404.css'
const errorProps ={ 
    icon:'fa-exclamation-triangle',
    title:'página não encontrada',
    subtitle:'pagina não econtrada'
}
export default props=>

    <Main {...errorProps}>
        <div className="erro">
            <h1 className="text-danger"> <i className="fa fa-exclamation-triangle"></i>404</h1>

            <p>página não encontrada</p>
        </div>
        
    </Main>