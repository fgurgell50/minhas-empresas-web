import React from "react";
import { withRouter } from "react-router-dom";
import Card from '../../components/card'
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import FornecedorTable from "./fornecedorTable";
import FornecedorService from "../../app/service/fornecedorService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaFornecedor extends React.Component{

    state = {
        showConfirmDialog: false,
        fornecedorDeletar: {},
        fornecedores : [],
        cnpj_cpf:'',
        nome:'',
    }

    constructor(){
        super();
        this.service = new FornecedorService();
    }

    buscar = () => {
        
        console.log('Entrou no buscar', this.state)

        if(!this.state.cnpj_cpf){
            messages.mensagemErro('É necessário o preenchimento do campo CNPJ/CPF.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem( '_usuario_logado' )

        const fornecedorFiltro = {
            cnpj_cpf: this.state.cnpj_cpf,
            nome: this.state.nome
        }
        console.log('Entrou no buscar', fornecedorFiltro)

        this.service
            .consultar(fornecedorFiltro)
            .then(resposta => {
                console.log('Retorno da Busca',resposta.data)
                this.setState({fornecedores: resposta.data})
            }).catch(error =>{
                console.log(error)
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-fornecedor')
    }

    editar = (id) => {
        console.log('Editando o Lançamento',id)
        this.props.history.push( `/cadastro-fornecedor/${id}`)

    }

    abrirConfirmacao = (fornecedor) => {
        console.log('Fornecedor 1',fornecedor)
        this.setState({ showConfirmDialog : true, fornecedorDeletar: fornecedor })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, fornecedorDeletar: {}  })
    }

    deletar = () => {
        console.log('Fornecedor Deletar',this.state.fornecedorDeletar.fornecedor_id)
        this.service
            .deletar(this.state.fornecedorDeletar.fornecedor_id)
            .then(response => {
                const fornecedores = this.state.fornecedores;
                const index = fornecedores.indexOf(this.state.fornecedorDeletar)
                fornecedores.splice(index, 1);
                this.setState( { fornecedores: fornecedores, showConfirmDialog: false } )
                messages.mensagemSucesso('Fornecedor deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Fornecedor')
            })
    }

    render(){
        //const meses = this.service.obterListaMeses()
        //const tipos = this.service.obterListaTipos()

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Fornecedores">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputCnpj" label="CNPJ/CPF: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputCnpj" 
                                    value={this.state.cnpj_cpf}
                                    onChange={e => this.setState({ cnpj_cpf: e.target.value })}
                                    placeholder="Digite o CNPJ/CPF(completo ou parte)" />
                            </FormGroup>

                            <FormGroup htmlFor="inputNome" label="Nome: ">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputNome" 
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                       
                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>

                        </div>
                    </div>
                </div> 
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-compoment"></div>
                        <FornecedorTable fornecedores={this.state.fornecedores} 
                                          deleteAction={this.abrirConfirmacao}
                                          editAction={this.editar}  />
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão deste Fornecedor?
                    </Dialog>
                </div>    

            </Card>

        )

    }

}
export default withRouter(ConsultaFornecedor)