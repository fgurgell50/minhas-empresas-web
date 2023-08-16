import React from "react";
import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from "../views/login";
import CadastroEmpresa from "../views/cadastroEmpresa";
import Home from '../views/home'
import ConsultaFornecedor from "../views/fornecedores/consulta-fornecedor";
import CadastroFornecedor from "../views/fornecedores/cadastro-fornecedor";

function Rotas() {
  return (
    <HashRouter>
      <Switch>
      <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/cadastro-empresas" component={CadastroEmpresa} />
        <Route path="/consulta-fornecedor" component={ConsultaFornecedor} />
        <Route path="/cadastro-fornecedor/:id?" component={CadastroFornecedor} />
        {/* Outras rotas aqui, se você tiver */}
      </Switch>
    </HashRouter>
  );
}

export default Rotas;
