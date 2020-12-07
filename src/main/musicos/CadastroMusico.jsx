import React, { Component } from 'react';
import { Button, TextField, Backdrop, CircularProgress } from '@material-ui/core';
import { registrarMusico } from '../apis/musico';
import './cadastro.css';

class CadastroMusico extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      loading: false,
      nome: "",
      pais: "",
      cidade: "",
      errors: {}
    }

    this.state = { ...this.initialState };
  }

  handleInputChange = event => {

    const { name, value } = event.target;

    this.setState({ [name]: value, errors: { ...this.state.errors, [name]: null } });
  }

  handleClearButtonClick = () => {
    this.clearFields();
  }

  clearFields = () => {
    this.setState({
      ...this.initialState
    })
  }

  handleSubmitButtonClick = () => {
    this.registerNewMusician();
  }

  registerNewMusician = async () => {
    try {
    const { nome, pais, cidade } = this.state;

    const carroData = {
      nome,
      pais,
      cidade,
    }

    const newErrors = {};

    if (!nome) {
      newErrors.nome = "O nome deve ser preenchido";
    }
    if (!pais) {
      newErrors.pais = "O país deve ser preenchido";
    }
    if (!cidade) {
      newErrors.cidade = "A cidade deve ser preenchida";
    }

    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      this.setState({ errors: newErrors })
      return;
    }

    this.setState({loading: true});
    const response = await registrarMusico(carroData);
    
    if (!response.ok) {
      alert("Erro no cadastro do compositor");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    this.clearFields();
    //const textResponse = await response.text();

    } catch (error) {
      console.log("Erro no cadastro de compositores", error);
      alert("Erro no cadastro do compositor");
    } finally {
      this.setState({loading: false});
    }
  }

  render() {
    const { nome, pais, cidade, errors, loading } = this.state;

    return (
      <div className="cadastro-container">
      <h1>Cadastro de músicos</h1>
      <div className="input-area">
        <div>
          <TextField name="nome" className="input-md" label="Nome" variant="outlined" value={nome} onChange={this.handleInputChange} error={!!errors.nome} helperText={errors.nome} />
        </div>
        <div>
          <TextField name="pais" className="input-md" label="País" variant="outlined" value={pais} onChange={this.handleInputChange} error={!!errors.pais} helperText={errors.pais} />
        </div>
        <div>
          <TextField name="cidade" className="input-md" label="Cidade" variant="outlined" value={cidade} onChange={this.handleInputChange} error={!!errors.cidade} helperText={errors.cidade} />
        </div>
      </div>
      <div className="buttons-area">
        <Button className="button" variant="contained" color="primary" onClick={this.handleSubmitButtonClick}> Cadastrar </Button>
        <Button className="button" variant="contained" onClick={this.handleClearButtonClick}> Limpar </Button>
      </div>
      <Backdrop className="backdrop" open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    );
  }
}

export default CadastroMusico;