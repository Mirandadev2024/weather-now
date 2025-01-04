import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import minhaImagem from './assets/tempo.png';

const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});

class App extends Component {
  state = {
    previsoes: [],
    isLoading:false
  };

  getPrevisoes = async () => {
    
    try {

      const city = document.querySelector('.custom-input').value;
      this.setState({ previsoes: [], isLoading: true});
      const { data } = await api.get('/', {
        params: {
          q: city,
          appid: API_KEY,
        },
      });
      this.setState({ previsoes: [data], isLoading:false}); // Wrap data in an array for mapping
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="AppHeader">
        <img src = {minhaImagem}/>
        <form form onSubmit={(e) => e.preventDefault()}>
          <h2 className = "display-data">Retornar a previsão do tempo para sua cidade</h2><br/>
          <input className = "custom-input" type = "text" placeholder = "Digite sua cidade" height = "50" width = "100"/><br/><br/>
          <input  className = "custom-input-submit" type = "submit" onClick = {this.getPrevisoes}/><br/>
        </form>

         <p className = "main-text-style">Clique no botão para saber mais sobreo os dados meteorológicos da sua cidade</p>
          {this.state.isLoading?(<p className = "carregamento">Carregando dados</p>):(
          this.state.previsoes.map((previsao) => (
            <>
            <h2 className = "display-data" key={previsao.coord.lon}>Temperatura: {Math.round(previsao.main.temp -273,1)}°C</h2><br/>
            <h2 className = "display-data" key={previsao.coord.lon}>Pressão: {Math.round(previsao.main.pressure,1)}hPa</h2><br/>
            <h2 className = "display-data" key={previsao.coord.lon}>Umidade: {Math.round(previsao.main.humidity,1)}%</h2>
            </>
          )))}
        </header>
      </div>
    );
  }
}

export default App;