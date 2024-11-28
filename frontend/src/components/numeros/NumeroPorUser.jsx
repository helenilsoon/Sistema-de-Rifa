import React,{Component} from "react";
import Main from "../template/Main";
import axios   from 'axios'





const headerProps ={ 
    icon:'fa-sort-numeric-desc',
    title:'Vendendor',
    subtitle:'Mostra o número referente a cada vendendor'
}
const baseUrl ='http://localhost:3001/Numeros'
const baseUrlVendedor ='http://localhost:3001/Vendedor'
 

const initialState= {
    numeros:{
        'id':0 ,
        "name": "",
        "lider": "",
        "vendedor":"",
        "numberInicio": 0  ,
        "numberFinal": 0,
        "numerosEscolhidos":[]
    },
    list:[],
    vendedor:[],
    intervalonumero:[]
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

    // #rederiza dentro do formulario
    // e apresenta uma lista de vedendores
    rendervendedor(){
        return(
            <select 
                name="vendedor"
                id="vendedor" 
                value={this.state.numeros.vendedor} 
                onChange={e =>   this.updateLeader(e) }>

            <option value="">Selecione um vendedor</option>

            { this.state.vendedor.map(vendedor=>(
                    
                <option key={vendedor.id}   data-lider={ vendedor.lider }>
                    { vendedor.name }
                </option>
            
            ))}
            </select>
        )
    }
    // rederiza os vendedores no topo da pagina 
    renderNumeroVendedor(){            
        return(
            <>
           
            <div className="form">
                <div className="row">
                    <div className="col-8 col-md-4">
                        <div className="form-group">

                             <label htmlFor="vendedor"> Vendedor: </label><br />
                            <select 
                                name="vendedor"
                                id="vendedor" 
                                value={this.state.intervalonumero.name} 
                                onChange={e =>   this.updateRenderNumber(e) }>

                            <option value="">Selecione um vendedor</option>

                            { this.state.vendedor.map(vendedor=>(
                                    
                                <option key={vendedor.id} data-numberfinal={vendedor.numberFinal} data-numberinicio={vendedor.numberInicio}  data-vendedor={ vendedor.name } >
                                    { vendedor.name }                                                     
                                </option>
                            
                            ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    updateLeader(event){
        const lider  = event.target.options[event.target.selectedIndex].getAttribute('data-lider')            
        const numeros = { ...this.state.numeros}
        numeros[event.target.name]=event.target.value
        numeros['lider'] = lider             
        this.setState({ numeros })
        
    }   
    updateRenderNumber(event){        
        const inicio  = event.target.options[event.target.selectedIndex].getAttribute('data-numberinicio')            
        const final   =event.target.options[event.target.selectedIndex].getAttribute('data-numberfinal')
        const name = event.target.options[event.target.selectedIndex].getAttribute('data-vendedor')        
            
        const listaFiltrada = this.state.list.filter(item => {
            const numerosEscolhidos= parseFloat(item.id);                
            return numerosEscolhidos>= inicio && numerosEscolhidos <= final
        })            
            this.setState({ intervalonumero: listaFiltrada})
        
    }  
    
    renderNumber(){
        return this.state.intervalonumero.map(numeros=> {               
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
                     
             <div className="m-2 p-2 alert-success ">{ this.renderNumeroVendedor() }
             </div>
             {/* {this.state.intervalonumero.id && this.renderNumber} */}
                <div className="p-5 ">{this.state.numeros.id && this.renderForm()} </div>
             
              <div className="mt-5 p-5 ">{this.renderNumber()} </div>

            </Main>
        )
    }
}