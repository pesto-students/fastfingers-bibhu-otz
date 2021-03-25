import React, { Component } from 'react';
import './App.css';
import Logo from './components/logo';
import GameHome from './interfaces/game-home'
import GameDashboard from './interfaces/game-dashboard'

class App extends Component {
  state = {
    displayScreen: false
   
  }
  componentDidMount() {
    this.screenToDisplay();
  }
  
  screenToDisplay = () => {
    let playerName = window.sessionStorage.getItem('playerName');
    let gameDifficultyLevel = window.sessionStorage.getItem('gameDifficultyLevel');
    if (playerName !== null && gameDifficultyLevel !== null) {
      this.setState({ displayScreen: true });
    } else {
      this.setState({ displayScreen: false });
    }
    
  }
  render() {
    let { displayScreen } = this.state;
    return (
      <div className="App">
        {!displayScreen &&
          <div>
            <Logo />
            <GameHome screenToDisplay={() => this.screenToDisplay()} />
          </div>
        }
        {displayScreen &&
          <GameDashboard screenToDisplay={() => this.screenToDisplay()} />
        }
      </div>
    );
  }
}

export default App;
