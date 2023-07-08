import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {isAuthenticated} from './services/auth';

import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import PageListOrAdd from './pages/PageListOrAdd';
import Adiantamento from './pages/Adiantamento';
import AdiantamentoList from './pages/AdiantamentoList';

import Alimentacao from './pages/Alimentacao';
import AlimentacaoList from './pages/AlimentacaoList';

import Abastecimento from './pages/Abastecimento';
import AbastecimentoList from './pages/AbastecimentoList';

import DespesaExtra from './pages/DespesaExtra';
import DespesaExtraList from './pages/DespesaExtraList';

import Hospedagem from './pages/Hospedagem';
import HospedagemList from './pages/HospedagemList';

import Pecas from './pages/Pecas';
import PecaList from './pages/PecaList';

import Roco from './pages/Roco';
import RocoList from './pages/RocoList';

import TodasDespesasList from './pages/TodasDespesasList';

import AlterarSaldo from './pages/AlterarSaldo';
import AlterarSaldoList from './pages/AlterarSaldoList';

import Print from './pages/Print';
import PrintEntradas from './pages/PrintEntradas';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/signin`,
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute
        exact
        path="/castrar-listar"
        component={PageListOrAdd}
      />

      <Route path="/signin" component={SignIn} />

      <PrivateRoute
        exact
        path="/adiantamento"
        component={Adiantamento}
      />

      <PrivateRoute
        exact
        path="/adiantamento-list"
        component={AdiantamentoList}
      />

      <PrivateRoute
        exact
        path="/alimentacao"
        component={Alimentacao}
      />

      <PrivateRoute
        exact
        path="/alimentacao-list"
        component={AlimentacaoList}
      />

      <PrivateRoute
        exact
        path="/abastecimento"
        component={Abastecimento}
      />

      <PrivateRoute
        exact
        path="/abastecimento-list"
        component={AbastecimentoList}
      />

      <PrivateRoute
        exact
        path="/despesa-extra"
        component={DespesaExtra}
      />

      <PrivateRoute
        exact
        path="/despesa-extra-list"
        component={DespesaExtraList}
      />

      <PrivateRoute exact path="/hospedagem" component={Hospedagem} />

      <PrivateRoute
        exact
        path="/hospedagem-list"
        component={HospedagemList}
      />

      <PrivateRoute exact path="/pecas" component={Pecas} />
      <PrivateRoute exact path="/pecas-list" component={PecaList} />

      <PrivateRoute exact path="/roco" component={Roco} />

      <PrivateRoute exact path="/roco-list" component={RocoList} />

      <PrivateRoute
        exact
        path="/todas-despesas-list"
        component={TodasDespesasList}
      />

      <PrivateRoute
        exact
        path="/alterar-saldo"
        component={AlterarSaldo}
      />

      <PrivateRoute
        exact
        path="/alterar-saldo-list"
        component={AlterarSaldoList}
      />

      <PrivateRoute exact path="/print" component={Print} />

      <PrivateRoute
        exact
        path="/print-entradas"
        component={PrintEntradas}
      />

      <Route
        path="*"
        component={() => <h1>Page não encontrada</h1>}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
