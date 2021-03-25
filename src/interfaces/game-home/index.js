import React, { Component } from 'react';
import './GameHome.scss';

class GameHome extends Component {
    state = {
        playerName: "",
        gameDifficultyLevel: "easy"
    }
    handleUserInput = (name,value) => {
        this.setState({[name]:value})
    }
    startTheGame =()=>{
        this.setState({playerNameErr:false});
        let { playerName, gameDifficultyLevel } = this.state;
        playerName= typeof(playerName)==='string' ? playerName : false;
        gameDifficultyLevel= typeof(gameDifficultyLevel)==='string' && gameDifficultyLevel!=="" ? gameDifficultyLevel : false;
        if(!playerName){
            this.setState({playerNameErr:'Player name required'});
        }else{
            this.setState({playerNameErr:false});
        }
        if(!gameDifficultyLevel){
            this.setState({gameLevelErr:'Game level required'});
        }else{
            this.setState({gameLevelErr:false});
        }
        if(playerName && gameDifficultyLevel){
            window.sessionStorage.setItem('playerName',playerName);
            window.sessionStorage.setItem('gameDifficultyLevel',gameDifficultyLevel);
            this.props.screenToDisplay();
            
        }
        
    }
    render() {
        let { playerName, gameDifficultyLevel,playerNameErr} = this.state;
        return (
            <div className="container form-container">
                <div className="col-lg-4 offset-lg-4">
                    <div className="input-group mb-3">
                        <input data-testid="input-player-name" placeholder="TYPE YOUR NAME"
                            value={playerName}
                            onChange={(e) => this.handleUserInput('playerName', e.target.value)}
                            className="form-control" type="text" />
                    </div>
                    {playerNameErr && <p className="txt-error">* {playerNameErr}</p>}
                    <div className="input-group mb-3">
                        <select placeholder="Select Game Level" data-testid="select-game-level" value={gameDifficultyLevel} onChange={(e) => this.handleUserInput('gameDifficultyLevel', e.target.value)}
                            className="form-control" >
                           
                            <option value="easy">EASY</option>
                            <option value="medium">MEDIUM</option>
                            <option value="hard">HARD</option>
                        </select>
                    </div>
                  
                    <div className="text-center mt-3">
                      <button className="btn btn-start" data-testid="start-btn" onClick={()=>this.startTheGame()}>START GAME</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default GameHome;
