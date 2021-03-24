import React,{Component} from 'react';
import './top.scss';
import playerIcon from '../../assets/images/Iconmaterial-person.svg';
import gamePadIcon from '../../assets/images/Iconawesome-gamepad.svg';
class Top extends Component{
    state={
        playerName:""
    }
    componentDidMount(){
        const playerName = window.sessionStorage.getItem('playerName');
        
        this.setState({playerName})
    }
    render(){
        const {score,gameDifficultyLevel}=this.props;
        const {playerName}=this.state;
        const { gameOverStatus } = this.props;
        
        return(
            <div className="container-fluid header-container">
                <div className="row custom-row">
                    <h2 className="col-md-6 col-12 player-name"><img src={playerIcon} alt="player icon"/>{playerName}</h2>
                    <h2 className="offset-md-4 col-md-2 col-12 game-name">fast fingers</h2>
                </div>
                <div className="row">
                    <h2 className="col-md-6 col-12 game-level"><img src={gamePadIcon}  alt="game pad icon"/>LEVEL : {gameDifficultyLevel}</h2>
                    {!gameOverStatus &&
                               <h2 className="offset-md-4 col-md-2 col-12 score">SCORE: {score}</h2>
                    }
                    
                </div>
            </div>
        )
    }
}
export default Top