import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import EmpresaService from '../app/service/empresaService'
import ValidaCnpjCpf from '../app/service/validaCnpjCpf'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroEmpresa extends React.Component{

    state = {
        cnpj : '',
        nome_fantasia:'',
        cep:''
    }

    constructor(){
        super();
        this.service = new EmpresaService();
    }

    validar(){
        const msgs = []

        if(!this.state.cnpj){
            msgs.push('O campo CNPJ é obrigatório')
        }else{
            if(!ValidaCnpjCpf.validarCNPJ(this.state.cnpj)){
                msgs.push('CNPJ Inválido')
            }
        }

        if(!this.state.nome_fantasia){
            msgs.push('O campo Nome é obrigatório')
        }
        if(!this.state.cep){
            msgs.push('O campo CEP é obrigatório')
        }
        return msgs;
    }


    cadastrar = () => {
        const msgs = this.validar()
        //Array = [1,2,3] posição 0,1,2
        if( msgs && msgs.length > 0 ){ 
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)

            })
            return false
        }

        //const {nome, email, senha, senhaRepeticao } = this.state        
        //const usuario = {nome,  email, senha, senhaRepeticao }
        const empresa = {
            cnpj : this.state.cnpj,
            nome_fantasia: this.state.nome_fantasia, 
            cep: this.state.cep
        }
       
        
        this.service.salvar(empresa)
            .then( response => {
                mensagemSucesso('Empresa cadastrada com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return (
            <Card title="Cadastro de Empresa">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                                <input type="text" 
                                       id="inputCnpj" 
                                       className="form-control"
                                       name="cnpj"
                                       onChange={e => this.setState({cnpj: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                       id="inputNome"
                                       className="form-control"
                                       name="nome_fantasia"
                                       onChange={e => this.setState({nome_fantasia: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Cep: *" htmlFor="inputCep">
                                <input type="text" 
                                       id="inputCep"
                                       className="form-control"
                                       name="cep"
                                       onChange={e => this.setState({cep: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroEmpresa)