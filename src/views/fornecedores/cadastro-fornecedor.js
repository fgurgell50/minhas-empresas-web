import React from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { withRouter } from "react-router-dom";

import LocalStorageService from "../../app/service/localStorageService";
import ValidaCnpjCpf from '../../app/service/validaCnpjCpf'

import SelectMenu from "../../components/selectMenu";

import EmpresaService from "../../app/service/empresaService";
import FornecedorService from "../../app/service/fornecedorService";
import CepService from "../../app/service/cepService";

import * as messages from '../../components/toastr'
//import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroFornecedores extends React.Component{

    state = {
        id: null,
        cnpj_cpf: '',
        nome: '',
        email: '',
        rg: '',
        data_nascimento: '',
        cep:'',
        empresas: []
    }

    constructor(){
        super();
        this.service = new FornecedorService();
        this.empresaService = new EmpresaService();
        this.cepService = new CepService();
        this.validaservice = new ValidaCnpjCpf();
        this.carregarListaEmpresas();
    }

    carregarListaEmpresas() {
        this.empresaService
            .carregarListaEmpresas()
            .then(listaEmpresas => {
                this.setState({ empresas: listaEmpresas });
            })
            .catch(error => {
                console.error('Erro ao carregar lista de empresas:', error);
            });
    }

    
    validar(){
        const msgs = []

        if (!this.state.cnpj_cpf) {
            msgs.push('O campo CNPJ/CPF é obrigatório');
        } else if (this.state.cnpj_cpf.length <= 11) {
            if (ValidaCnpjCpf.validarCPF(this.state.cnpj_cpf)) {
                if (!this.state.rg) {
                    msgs.push('O campo RG é obrigatório para Pessoa Física');
                }
                if (!this.state.data_nascimento) {
                    msgs.push('O campo Data de Nascimento é obrigatório para Pessoa Física');
                }
            } else {
                msgs.push('CPF Inválido');
            }
        } else if (this.state.cnpj_cpf.length > 12) {
            if (!ValidaCnpjCpf.validarCNPJ(this.state.cnpj_cpf)) {
                msgs.push('CNPJ Inválido');
            }
        }
        
        
        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório')
        }

        if(!this.state.cep){
            msgs.push('O campo cep é obrigatório')
        }//else if(!this.cepService(this.state.cep)){
          //  msgs.push('Esse CEP é inválido')
        //}

        if(!this.state.email){
            msgs.push('O campo email é obrigatório')
            // regex /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/
        }else if( ! this.state.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ){
           msgs.push('Informe um email válido')
        }
       return msgs;
    }

    submit = () => {

        const msgs = this.validar()
        //Array = [1,2,3] posição 0,1,2
        if( msgs && msgs.length > 0 ){ 
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)

            })
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

      //qdo tem o memso nome não precisa passar decsricao: descricao, valor: valor
 
      const { cnpj_cpf, nome, email, rg, data_nascimento, cep, empresas, selectedEmpresaIndex } = this.state;

      let selectedEmpresaId;
      let fornecedor = {
          cnpj_cpf,
          nome,
          email,
          rg,
          data_nascimento,
          cep,
          empresas: []
      };
  
      if (selectedEmpresaIndex !== undefined && selectedEmpresaIndex !== -1) {
          console.log('Index Selecionado', selectedEmpresaIndex)
          selectedEmpresaId = empresas[selectedEmpresaIndex].value;
          fornecedor.empresas = selectedEmpresaId !== null ? [{ id: selectedEmpresaId }] : [];
      }


      
        console.log('Objeto Envia Fornecedor', fornecedor)
        this.service
            .salvar(fornecedor)
            .then(response => {
                 messages.mensagemSucesso('Fornecedor cadastrado com sucesso!')
                 this.props.history.push('/consulta-fornecedor')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    handleEmpresaChange = event => {
        const selectedEmpresaIndex = event.target.selectedIndex;
        this.setState({ selectedEmpresaIndex });
      }
      

     render(){
        //const { listaEmpresas } = this.state;

        const { empresas } = this.state;
        console.log('Estamos no Render com a Lista', empresas)

        return(
            <Card title="Cadastro de Fornecedores">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputCnpj_cpf" label="CNPJ/CPF: *" >
                            <input id="inputCnpj_cpf" type="text" 
                                   className="form-control" 
                                   name="cnpj_cpf"
                                   value={this.state.cnpj_cpf}
                                   onChange={this.handleChange}  />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputNome" label="Nome: *">
                            <input id="inputNome" 
                                   type="text"
                                   name="nome"
                                   value={this.state.nome}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputEmail" label="Email: *">
                            <input id="inputEmail" 
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                         <FormGroup id="inputRg" label="RG: *">
                            <input id="inputRg" 
                                   type="text"
                                   name="rg"
                                   value={this.state.rg}
                                   onChange={this.handleChange} 
                                   className="form-control" />
                        </FormGroup>
                    </div>
                      
                    <div className="col-md-4">
                        <FormGroup id="inputLista" label="Empresas: ">
                            <SelectMenu
                                id="inputEmpresas"
                                lista={empresas}
                                name="empresas"
                                value={this.state.selectedEmpresaIndex} // Atualização aqui
                                onChange={this.handleEmpresaChange}
                                className="form-control"
                            />
                        </FormGroup>

                    </div>
 
                    <div className="col-md-4">
                         <FormGroup id="inputDataNasc" label="Data de Nascimento: ">
                            <input id="inputDataNasc" 
                                   type="date" 
                                   className="form-control" 
                                   name="data_nascimento"
                                   value={this.state.data_nascimento}
                                   onChange={this.handleChange} 
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                         <FormGroup id="inputCep" label="Cep: *">
                            <input id="inputCep" type="text" 
                                   className="form-control" 
                                   name="cep"
                                   value={this.state.cep}
                                   onChange={this.handleChange} 
                             />
                        </FormGroup>
                    </div>

                  </div>

                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.submit} 
                                        className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                        </button>
                        <button onClick={e => this.props.history.push('/consulta-fornecedores')} 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i>Cancelar
                        </button>
                    </div>
                </div>

            </Card>
        )
    }


}
export default withRouter(CadastroFornecedores)