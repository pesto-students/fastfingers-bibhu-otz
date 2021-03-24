import React, { Component } from 'react';
import ScoreCard from '../../components/scoreBoard';
import Top from '../../components/top';
import Timer from '../../components/timer';
import './GameDashboard.scss';
import crossIcon from '../../assets/images/Iconmetro-cross.svg';
import playAgainIcon from '../../assets/images/Iconopen-reload.svg';
import jsonData from '../../data/dictionary.json';

class GameDashboard extends Component {
    state = {
        difficultyFactor: 1,
        gameOverStatus: false,
        score: 0,
        formattedScore: '00:00'
    }
    componentDidMount() {
        this.prepareGameToPlay();
        this.setScoreTimerInterval();
    }
    
    prepareGameToPlay = () => {
        let { difficultyFactor } = this.state;

        //Get the game level from session storage
        const gameDifficultyLevel = window.sessionStorage.getItem('gameDifficultyLevel');

        //Chunk the data dictionary and get the level wise words
        const wordsForGame = this.getWords(jsonData);

        let wordsForGameDifficultyLevel;
        //check if game level exist in the wordsForGame
        if (gameDifficultyLevel in wordsForGame) {
            wordsForGameDifficultyLevel = wordsForGame[gameDifficultyLevel];
        }
        if (wordsForGameDifficultyLevel) {
            const randomWord = this.getRandomWord(wordsForGameDifficultyLevel);
            const timeLimit = this.getTimerLimit(randomWord, difficultyFactor);
            this.setState({ wordsForGameDifficultyLevel, gameDifficultyLevel, randomWord, timeLimit })
        } 
    }
    /*
        Based on game Difficulty level prepare words for the game
        - For `EASY` difficulty level, word length should be less than or equal to 4.
        - For `MEDIUM` difficulty level, word length should be between 5-8(noth numbers included).
        - For `HARD` difficulty level, word length should be greater than 8.

    */
    getWords = (data) => {
        let Words = [];
            Words = data.slice(0, 100000).reduce((accumulator, current) => {
            if (current.length <= 4) {
                accumulator.easy.push(current)
            }
            else if (current.length >= 5 && current.length <= 8) {
                if ('medium' in accumulator) {
                    accumulator['medium'].push(current);
                } else {
                    accumulator['medium'] = [current];
                }
            } else {
                if ('hard' in accumulator) {
                    accumulator['hard'].push(current);
                } else {
                    accumulator['hard'] = [current];
                }
            }
            return accumulator;
        }, { easy: [] });
        return Words;
    }
    //pick random word from wordsForGameLevel
    getRandomWord = (wordsForGameDifficultyLevel) => {
        const max = wordsForGameDifficultyLevel.length;
        const randomIndex = this.getRandomInt(max);
        return wordsForGameDifficultyLevel[randomIndex];
    }
    //Get the random number upto max
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //Get timer value
    getTimerLimit = (randomWord, difficultyFactor) => {
        let timeLimit = randomWord.length / difficultyFactor;
        if (timeLimit < 2) {
            timeLimit = 2;
        }
        return timeLimit;
    }
    //Input word by user handling
    handleWordInput = (value) => {
        let { wordsForGameDifficultyLevel, randomWord, difficultyFactor, coloredWord } = this.state;
        //Coloring the word
        let regExp = new RegExp(value.toLowerCase());
        if (regExp.test(randomWord)) {
            coloredWord = randomWord.replace(regExp, `<span class="matched">${value}</span>`);
        } else {
            let unmatchedValue = randomWord.substring(0, value.length);
            let regExp = new RegExp(unmatchedValue.toLowerCase());
            coloredWord = randomWord.replace(regExp, `<span class="un-matched">${unmatchedValue}</span>`);
        }


        if (value.toLowerCase() === randomWord) {
            //Increase difficulty factor by 0.01
            difficultyFactor = difficultyFactor += 0.01;

            const randomWord = this.getRandomWord(wordsForGameDifficultyLevel);
            const timeLimit = this.getTimerLimit(randomWord, difficultyFactor);

            //Increase  game level based on difficultyFactor
            if (difficultyFactor === 1.5) {
                this.setState({ gameLevel: 'medium' }, () => this.setInStorage('medium'));

            } else if (difficultyFactor === 2) {
                this.setState({ gameLevel: 'hard' }, () => this.setInStorage('hard'));
            }
            this.setState({ randomWord, timeLimit, difficultyFactor, inputWord: "", coloredWord: false });
        } else {
            this.setState({ inputWord: value, coloredWord });
        }
    }
    //Update game level to session storage
    setInStorage = (gameLevel) => {
        window.sessionStorage.setItem('gameDifficultyLevel', gameLevel);
    }
    //Timeout function to show player as game over
    gameOver = () => {
        const { score, formattedScore } = this.state;
        this.saveScoreAndGameName(score, formattedScore);
        this.setState({ gameOverStatus: true });
        clearInterval(this.state.scoreTimerInterval);
    }
    //Set the game to play again
    playAgain = () => {
        this.setState({
            gameOverStatus: false, inputWord: "",
            score: 0, formattedScore: '00:00', coloredWord: false
        });
        this.prepareGameToPlay();
        this.setScoreTimerInterval();
    }
    //start score timer
    setScoreTimerInterval = () => {
        const scoreTimerInterval = setInterval(this.scoreTimer, 1000);
        this.setState({ scoreTimerInterval });
    }
    //Score timer
    scoreTimer = () => {
        let { score } = this.state;
        score = score += 1;
        const formattedScore = this.formatScore(score);
        this.setState({ score, formattedScore });
    }
    //format the score
    formatScore = (score) => {
        let minutes = Math.floor(score / 60);
        let seconds = score % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }
    //Save the game name and scores into session storage
    saveScoreAndGameName = (score, formattedScore) => {
        let savedScoreAndGameList = window.sessionStorage.getItem('scoreBoard');
        savedScoreAndGameList = savedScoreAndGameList ? JSON.parse(savedScoreAndGameList) : null;
        let gameName;
        if (savedScoreAndGameList && savedScoreAndGameList.length > 0) {
            gameName = `Game ${savedScoreAndGameList.length + 1}`;
            savedScoreAndGameList.push({ formattedScore, score, name: gameName })
        } else {
            savedScoreAndGameList = [];
            gameName = `Game ${1}`;
            savedScoreAndGameList.push({ formattedScore, score, name: gameName });
        }

        const newBestScore = savedScoreAndGameList && savedScoreAndGameList.length > 0 &&
            savedScoreAndGameList.filter((scoreData) => scoreData.score > score);
        if (newBestScore.length === 0) {
            this.setState({ gameName, newBestScore: true });
        } else {
            this.setState({ gameName, newBestScore: false });
        }
        window.sessionStorage.setItem('scoreBoard', JSON.stringify(savedScoreAndGameList));
    }
    //Create Markup to innerHtml
    createMarkup(html) {
        return {
            __html: html
        };
    };
    //QUIT the game
    quitGame = () => {
        window.sessionStorage.clear();
        this.props.screenToDisplay();
        
    }
    render() {
        let { randomWord, timeLimit, inputWord, gameOverStatus, formattedScore,
            gameDifficultyLevel, gameName, newBestScore, coloredWord } = this.state;
        return (
            <div>
                <Top score={formattedScore} gameOverStatus={gameOverStatus} gameDifficultyLevel={gameDifficultyLevel} />
                <div className="container-fluid dashboard-container">
                    {!gameOverStatus &&
                        <div className="row">
                            <div className="col-md-2 hidden-xs">
                                <ScoreCard  />
                            </div>
                            <div className="offset-md-3 col-md-3">
                                {timeLimit && <Timer timeLimit={timeLimit} gameOver={this.gameOver} />}
                                {!coloredWord && <h2>{randomWord}</h2>}
                                {coloredWord && <h2 dangerouslySetInnerHTML={this.createMarkup(coloredWord)}></h2>}
                                <div className="input-group mb-3">
                                    <input autoFocus className="form-control word-input" value={inputWord || ''}
                                        onChange={(e) => this.handleWordInput(e.target.value, e.target.key)} type="text" />
                                </div>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                    }
                    {gameOverStatus &&
                        <div className="row game-over-container">
                            <div className="offset-md-4 col-md-5">
                                <h2>SCORE : {gameName}</h2>
                                <h4>{formattedScore}</h4>
                                {newBestScore && <p>New High Score</p>}
                                <h5 className="play-again" onClick={() => this.playAgain()}>
                                    <img src={playAgainIcon} alt="player icon" /> Play Again
                                </h5>
                            </div>
                        </div>
                    }
                    <div className="row">

                        <div className="col-md-4  col-12">
                            {!gameOverStatus &&
                                <h2 className="stop-game" onClick={() => this.gameOver()}>
                                    <img src={crossIcon} alt="player icon" /> STOP GAME
                                </h2>
                            }
                            {gameOverStatus &&
                                <h2 className="quit-game" onClick={() => this.quitGame()}>QUIT</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameDashboard