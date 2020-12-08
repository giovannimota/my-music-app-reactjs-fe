import React, { Component } from "react";
import { Button, TextField, Backdrop, CircularProgress } from "@material-ui/core";
import { registrarCompositor } from "../apis/compositor";
import "./cadastro.css";

class CadastroCompositor extends Component {
  //Método construtor
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

  //Função para atribuir valores nas variáveis que armazenam os valores (nome, pais, cidade)
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, errors: { ...this.state.errors, [name]: null } });
  }

  //Função que chama a função de limpar os campos
  handleClearButtonClick = () => {
    this.clearFields();
  }

  //Função de limpar os campos, ela seta os campos para o estado inicial
  clearFields = () => {
    this.setState({
      ...this.initialState
    })
  }

  //Função que chama a função de registrar um novo compositor
  handleSubmitButtonClick = () => {
    this.registerNewCompositor();
  }

  //Função para registrar um novo compositor
  registerNewCompositor = async () => {
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
      const response = await registrarCompositor(carroData);
      
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
        <h1>Cadastro de compositores</h1>
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
          <Button className="button" variant="outlined" color="primary" onClick={this.handleSubmitButtonClick}>Cadastrar</Button>
          <Button className="button" variant="outlined" color="secondary" onClick={this.handleClearButtonClick}>Limpar</Button>
        </div>
        <Backdrop className="backdrop" open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
export default CadastroCompositor;