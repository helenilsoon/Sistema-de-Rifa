import React,{Component} from "react";
import Main from "../template/Main";
import axios   from 'axios'


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



const headerProps ={ 
    icon:'fa-sort-numeric-desc',
    title:'Numeros',
    subtitle:'Cadastro de usuários:Incluir, Listar, Alterar e Excluir'
}
const baseUrl ='https://api.jsonbin.io/v3/b/65775ce61f5677401f0c77f6'
const baseUrlVendedor ='http://localhost:3001/Vendedor'
 

const initialState= {
    numeros:{
        "name": "",
        "lider": "",
        "vendedor":"",
        "numeroInicio": 0  ,
        "numerofinal": 0,
        "numerosEscolhidos":''
    },
    list:[],
    vendedor:[],
    filledNumber:[]
    
}

  

export default class Numeros extends Component{
        state= {...initialState}
        
       
        
        componentDidMount() {           
            axios(baseUrl).then(resp =>  {
                    this.setState({ list: resp.data })
                  })
            axios(baseUrlVendedor).then(resp =>  {
                    this.setState({ vendedor: resp.data })
                  })

                  
                this.filledNumber()
           
                
            
        }

        clear() {
            this.setState({ numeros: initialState.numeros})
        }
        save() {     
                    
                const numeros = this.state.numeros
                const method = numeros.id ? 'put' : 'post'
                const url = numeros.id ? `${baseUrl}/${numeros.id}` : baseUrl
                axios[method](url, numeros)
                    .then(resp => {
                        const list = this.getUpdateList(resp.data)
                         
                        this.setState({numeros:initialState.numeros, list})

                    })          
           
        }

        getUpdateList(numeros, add = true){
            const list = this.state.list.filter(u => u.id !== numeros.id)
           if(add) list.unshift(numeros)
            return list
        }

        updateField(event){           
                             
                const numeros = { ...this.state.numeros}
                numeros[event.target.name]=event.target.value
             
                this.setState({ numeros })
         
        }
        addNumberValueToNumberEscolhido(id){
            const numeros = { ...this.state.numeros}
            numeros['numerosEscolhidos']=id
            {/*numeros['lider'] = lider             */}
            this.setState({ numeros })
        }
        renderForm() {
            return(
                <div className="form" id='formCadastro'>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">comprador:</label>
                                <input type="text"  className="form-control"
                                    name="name"
                                    value={this.state.numeros.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder=" Digite o nome do comprador"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Vendedor</label>
                                {this.rendervendedor()}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Lider ou Quem Pegou a rifa: </label>
                                <p>{ ' '+ this.state.numeros.lider}</p>
                            </div>
                        </div>
                    </div>
                    {/*<div className="row">
                        <div className="col-6 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">numero Inicio</label>
                                <input type="text" className="form-control"
                                name="numeroInicio"
                                value={this.state.numeros.numeroInicio}
                                onChange={e => this.updateField(e)} 
                                placeholder="número inicio"/>
                            </div>
                        </div>
                        <div className="col-6 col-md-2">
                            <div className="form-group">
                                <label htmlFor="">numero final</label>
                                <input type="text" className="form-control"
                                name="numerofinal"
                                value={this.state.numeros.numerofinal}
                                onChange={e => this.updateField(e)} 
                                placeholder="número final"/>
                            </div>
                        </div>
            </div>*/}
                    <div className="row">
                    <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="">Numero</label>
                                <input type="text" className="form-control"
                                name="numerosEscolhidos"
                                value={this.state.numeros.numerosEscolhidos}
                                onChange={e => this.updateField(e)}
                                placeholder="números escolhidos"/>
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
        load(numeros) {
            this.setState({numeros})
        }
        loadNumber(numeros) {
            console.log(this.state.numeros) 
            this.setState({numeros})  
                  
        }
        remove(numeros){
            axios.delete(`${baseUrl}/${numeros.id}`).then(resp=> {
                const list = this.getUpdateList(numeros ,false)
                this.setState({ list })
            })
        }
        filledNumber() {
            const listapreenchida = this.state.list.filter(item => 
                item.numerosEscolhidos !== undefined && item.numerosEscolhidos !== '' 
            )
             const quantidadePreenchida = listapreenchida.length
            this.setState({ filledNumber: quantidadePreenchida })
            console.log(this.state.filledNumber)
        }

        renderTable() {
            return(
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>lider</th>
                            <th>numeroInicio</th>
                            <th>numerofinal</th>
                            <th>numerosEscolhidos</th>
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
            return this.state.list.map(numeros=> {
                return(
                    <tr key={numeros.id}>
                         <td>{numeros.id}</td>
                        <td>{numeros.name}</td>
                        <td>{numeros.lider}</td>
                        <td>{numeros.numeroInicio}</td>
                        <td>{numeros.numerofinal}</td>
                        <td>{numeros.numerosEscolhidos}</td>
                        <td>
                            <button className="btn btn-warning"
                            onClick={() =>this.load(numeros)}>
                                <i className="fa fa-pencil"></i>  
                            </button>
                            <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(numeros)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>


                    </tr>
                )
            })
        }
        rendervendedor(){
            return(
                <select 
                    name="vendedor"
                    id="vendedor" 
                    value={this.state.numeros.vendedor} 
                    onChange={e =>   this.updateLeader(e) }>

                <option value="">Selecione um vendedor</option>
                { this.state.vendedor.map(vendedor=>(
                        
                    <option 
                        key={vendedor.id}  
                        data-lider={ vendedor.lider }
                       >

                        { vendedor.name }
                    </option>
                
                ))}
                </select>
            )
        }
        updateLeader(event){
            const lider  = event.target.options[event.target.selectedIndex].getAttribute('data-lider')
            
            const numeros = { ...this.state.numeros}
            numeros[event.target.name]=event.target.value
            numeros['lider'] = lider             
            this.setState({ numeros })
          
            
            
        }   
        popUp(props){
            <Popup trigger={props.btn} position="top left">
            {close => (
              <div>
                
                <a className="close" onClick={close}>
                  &times;
                </a>
              </div>
            )}
          </Popup>
        }
        renderNumber(){
            return this.state.list.map(numeros=> {

                
                let btn =''
                if(numeros.numerosEscolhidos.length !== 0){
                     btn = 'btn-success'                     
                }else{
                    btn = 'btn-secondary'
                }
                return(                       
                    
                                
                        <button  
                            className={`btn m-1 ${btn}`} key={numeros.id}
                            value={numeros.id}
                            onClick={() => this.loadNumber(numeros)}>
                              {numeros.id} 
                              
                              
                                                               
                        </button>
                               
                 
                )
            })
        }
    render(){
       
        
        return (
            <Main {...headerProps}> 
                     {/*this.renderForm()*/}
           
               {this.state.numeros.id && this.renderForm()}
              
                {this.renderNumber()}
              
           
                
                
            </Main>
        )
    }
}