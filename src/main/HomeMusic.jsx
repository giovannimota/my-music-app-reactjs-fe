import React, { Component } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import CadastroCompositor from "./compositores/CadastroCompositor";
import BuscaCompositor from "./compositores/BuscaCompositor";
import CadastroMusico from "./musicos/CadastroMusico";
import BuscaMusico from "./musicos/BuscaMusico";
import "./homemusic.css";

class HomeMusic extends Component {

  render() {
    return (
      <div>
        <div className="conteudoPagina">
          <h1 className="nomePagina">Compositores e Músicos</h1>
          <div className="loja-container">
            <div className="bottom">
                <div className="leftNav">
                    <Link className="link" to="/">Home</Link>
                    <div className="topic">Compositores</div>
                    <Link className="link" to="/compositores/cadastro">Cadastro</Link>
                    <Link className="link" to="/compositores/busca">Busca</Link>
                    <div className="topic">Músicos</div>
                    <Link className="link" to="/musicos/cadastro">Cadastro</Link>
                    <Link className="link" to="/musicos/busca">Busca</Link>
                </div>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/compositores/cadastro" component={CadastroCompositor} />
                        <Route exact path="/compositores/busca" component={BuscaCompositor} />
                        <Route exact path="/musicos/cadastro" component={CadastroMusico} />
                        <Route exact path="/musicos/busca" component={BuscaMusico} />
                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div>
            </div>
          </div>
        </div>
        <footer>
          <h3>Desenvolvido por {this.props.nome}</h3>
          <h3>{this.props.meuEmail}</h3>
          <h3>{this.props.ano}</h3>
        </footer>
      </div>
    );
  }
}

export default HomeMusic;