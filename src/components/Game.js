import React from 'react';
import _ from 'lodash';
import {possibleCombinationSum} from './Utils'
import {Answer, Numbers, Stars, Button, DoneFrame} from './';

class Game extends React.Component {
    static numberOfStars = 1 + Math.floor(Math.random()*9)

    static initialState = {
        selectedNumbers: [],
        numberOfStars: Game.numberOfStars,
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null
    }

    state = Game.initialState

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1,10).filter(number =>
            usedNumbers.indexOf(number) === -1
        )
        return possibleCombinationSum(possibleNumbers, numberOfStars)

    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Done. Nice!'}
            }
            else if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over!'}
            }
        })
    }

    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0) {
            this.setState(prevState => ({
                answerIsCorrect: null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
            }))
        }
    }

    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }))
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: _.sum(prevState.selectedNumbers) === prevState.numberOfStars
        }))
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect:null,
            numberOfStars: 1 + Math.floor(Math.random()*9)
        }),() => this.updateDoneStatus())
    }

    redraw = () => {
        if(this.state.redraws > 0) {
            this.setState(prevState => ({
                answerIsCorrect: null,
                numberOfStars: 1 + Math.floor(Math.random() * 9),
                selectedNumbers: [],
                redraws: prevState.redraws - 1
            }),() => this.updateDoneStatus())
        }
    }

    playAgain = () => {
        this.setState(Game.initialState)
    }

    render() {
        const { selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state
        return(
            <div className="container">
                <h3>Play Nine</h3>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer}
                            redraw={this.redraw}
                            redraws={redraws}
                    />
                    <Answer selectedNumbers={selectedNumbers}
                            deselectNumber={this.deselectNumber}/>
                </div>
                <br />
                { doneStatus ?
                    <DoneFrame doneStatus={doneStatus} playAgain={this.playAgain}/> :
                    <Numbers selectedNumbers={selectedNumbers}
                             selectNumber={this.selectNumber}
                             usedNumbers={usedNumbers}/>
                }
            </div>
        )
    }
}

export default Game