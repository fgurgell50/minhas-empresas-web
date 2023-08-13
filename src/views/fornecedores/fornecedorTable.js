import React from 'react'
import currencyFormatter from 'currency-formatter'
import { format } from 'date-fns';

export default props => {

    const rows = props.fornecedores.map( fornecedor => {
        return (
            //lista com os campos fornecedorDTO
            <tr key={fornecedor.fornecedor_id}>
                <td>{fornecedor.cnpj_cpf}</td>
                <td>{fornecedor.nome}</td> 
                <td>{fornecedor.email}</td>
                <td>{fornecedor.rg}</td>
                <td>
                    {fornecedor.data_nascimento
                        ? format(new Date(fornecedor.data_nascimento), 'dd/MM/yyyy')
                        : ''}
                </td>
                <td>{fornecedor.cep}</td>
                <td>
                    {fornecedor.empresas &&
                        fornecedor.empresas.map(
                        empresa => empresa.nome_fantasia && empresa.nome_fantasia
                        ).join(', ')}
                </td>
                <td>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(fornecedor)}>
                            <i className="pi pi-trash"></i>
                    </button> 
                </td>            
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">CNPJ/CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">RG</th>
                    <th scope="col">Data de Nascimento</th>
                    <th scope="col">CEP</th>
                    <th scope="col">Empresas</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}