import React, { Component } from "react";
import { Button, TextField, Backdrop, CircularProgress } from "@material-ui/core";
import { buscarCompositor } from "../apis/compositor";
import "./busca.css";

class BuscaCompositor extends Component {
  constructor(props){
    super(props);

    this.initialState = {
      loading: false,
      nome: "",
      pais: "",
      cidade: "",
    }

    this.state = { ...this.initialState };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  handleClearButtonClick = () => {
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      ...this.initialState
    })
  }

  handleSearchButtonClick = () => {
    this.runSearch();
  }

  runSearch = async () => {
    try {
      const { nome, pais, cidade } = this.state;

      const filters = {};

      if (nome) {
        filters.nome = nome;
      }
      if (pais) {
        filters.pais = pais;
      }
      if (cidade) {
        filters.cidade = cidade;
      }

      this.setState({ loading: true });
      const response = await buscarCompositor(filters);
    } catch (error) {

    } finally {
      this.setState({ loading: false });
    }
  }

  render() {

    const { nome, pais, cidade, loading } = this.state;

    return (
      <div className="busca-container">
        <h1>Busca de compositores</h1>
        <div className="filter-area">
          <div>
            <TextField name="nome" className="input-md" label="Nome" variant="outlined" value={nome} onChange={this.handleInputChange} />
          </div>
          <div>
            <TextField name="pais" className="input-md" label="País" variant="outlined" value={pais} onChange={this.handleInputChange} />
          </div>
          <div>
            <TextField name="cidade" className="input-md" label="Cidade" variant="outlined" value={cidade} onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="buttons-area">
          <Button className="button" variant="outlined" color="primary" onClick={this.handleSearchButtonClick}> Buscar </Button>
          <Button className="button" variant="outlined" color="secondary" onClick={this.handleClearButtonClick}> Limpar </Button>
        </div>
        <Backdrop className="backdrop" open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default BuscaCompositor;