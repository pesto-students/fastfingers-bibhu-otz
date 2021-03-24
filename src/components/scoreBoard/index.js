import React, { Component } from 'react'
import './scoreboard.scss'
class ScoreBoard extends Component {
    state = {
        scoreBoard: []
    }
    componentDidMount() {
        let scoreBoard = window.sessionStorage.getItem('scoreBoard');
        scoreBoard = scoreBoard ? JSON.parse(scoreBoard) : [];
        const personalBest = scoreBoard && scoreBoard.length > 0 &&
            scoreBoard.reduce((acc, cur) => acc.score > cur.score ? acc : cur, {});
        this.setState({ scoreBoard, personalBest });
        
       
           
    }
    render() {
        const { scoreBoard, personalBest } = this.state;
        return (
            <div className="score-board-container">
                <h4>Score Board</h4>
                {scoreBoard && scoreBoard.length === 0 && <p>Your score board is empty!</p>}
                {scoreBoard && scoreBoard.length > 0 &&
                    scoreBoard.map((scoreData, index) => {
                        return index < 5 ?
                            <p key={scoreData.name}>{scoreData.name} : {scoreData.formattedScore}</p>
                            : ""
                    })
                }
                {personalBest &&
                    <div>
                        <h5>Personal Best</h5>
                        <p>{personalBest.name} : {personalBest.formattedScore}</p>
                    </div>
                }
            </div>
        )
    }
}

export default ScoreBoard