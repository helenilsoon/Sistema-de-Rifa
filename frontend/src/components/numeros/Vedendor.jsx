import React,{Component} from "react";
import Main from "../template/Main";
import axios   from 'axios'


const headerProps ={ 
    icon:'users',
    title:'Cadastrar Vedendor',
    subtitle:'Cadastro de usuários:Incluir, Listar, Alterar e Excluir'
}
const baseUrl ='http://localhost:3001/Vendedor'

const initialState= {
    user:{
        name: '',
        lider:'',
        numberInicio:'',
        numberFinal:'', 
    },
    list:[]
}

export default class UserCrud extends Component{
        state= {...initialState}
        
       
        
        componentDidMount() {
            axios(baseUrl).then(resp =>  {
                    this.setState({ list: resp.data })
                
           })            
        }

        clear() {
            this.setState({ user: initialState.user})
        }
        save() {     
                    
                const user = this.state.user
                const method = user.id ? 'put' : 'post'
                const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
                axios[method](url, user)
                    .then(resp => {
                        const list = this.getUpdateList(resp.data)
                         
                        this.setState({user:initialState.user, list})
                    })          
           
        }

        getUpdateList(user, add = true){
            const list = this.state.list.filter(u => u.id !== user.id)
           if(add) list.unshift(user)
            return list
        }

        updateField(event){           
                const user = { ...this.state.user}
                user[event.target.name]=event.target.value                        
                this.setState({ user })
                
               
            
        }

        renderForm() {
            return(
                <div className="form" id='formCadastro'>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Nome:</label>
                                <input type="text"  className="form-control"
                                    name="name"
                                    value={this.state.user.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder=" Digite o nome"/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">lider:</label>
                                <input type="text"  className="form-control"
                                    name="lider"
                                    value={this.state.user.lider}
                                    onChange={e => this.updateField(e)}
                                    placeholder=" Digite o nome do lider"/>
                            </div>
                        </div>
                       
                    </div>
                    <div className="row">
                         <div className="col-8 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">numberInicio:</label>
                                <input type="text"  className="form-control"
                                    name="numberInicio"
                                    value={this.state.user.numberInicio}
                                    onChange={e => this.updateField(e)}
                                    placeholder=" Digite o numberInicio"/>
                            </div>
                        </div>
                        <div className="col-8 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">numberFinal:</label>
                                <input type="text"  className="form-control"
                                    name="numberFinal"
                                    value={this.state.user.numberFinal}
                                    onChange={e => this.updateField(e)}
                                    placeholder=" Digite o numberFinal"/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e =>this.save(e)}>
                                Salvar
                            </button>
                            <button className="btn btn-secodary ml-2"
                                onClick={e => this.clear(e)}>
                                limpar
                            </button>
                        </div>
                    </div>
                 </div>
            )
        }
        load(user) {
            this.setState({user})
        }
        remove(user){
            axios.delete(`${baseUrl}/${user.id}`).then(resp=> {
                const list = this.getUpdateList(user ,false)
                this.setState({ list })
            })
        }

        renderTable() {
            return(
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>lider</th>
                            <th>Inicio</th>
                            <th>Final</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            )
        }
        renderRows() {
            return this.state.list.map(user=> {
                return(
                    <tr key={user.id}>
                         <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lider}</td>
                        <td>{user.numberInicio}</td>
                        <td>{user.numberFinal}</td>

                        <td>
                            <button className="btn btn-warning"
                            onClick={() =>this.load(user)}>
                                <i className="fa fa-pencil"></i>  
                            </button>
                            <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>


                    </tr>
                )
            })
        }
    render(){
       
        
        return (
            <Main {...headerProps}> 
               
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}