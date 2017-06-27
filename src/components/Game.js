import React from 'react';
import _ from 'lodash';
import {possibleCombinationSum} from './Utils'
import {Answer, Numbers, Stars, Button, DoneFrame} from './';

class Game extends React.Component {
    static numberOfStars = 1 + Math.floor(Math.random() * 9)

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
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        )
        return possibleCombinationSum(possibleNumbers, numberOfStars)

    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Done. Nice!'}
            }
            else if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over!'}
            }
        })
    }

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0) {
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
            answerIsCorrect: null,
            numberOfStars: 1 + Math.floor(Math.random() * 9)
        }), () => this.updateDoneStatus())
    }

    redraw = () => {
        if (this.state.redraws > 0) {
            this.setState(prevState => ({
                answerIsCorrect: null,
                numberOfStars: 1 + Math.floor(Math.random() * 9),
                selectedNumbers: [],
                redraws: prevState.redraws - 1
            }), () => this.updateDoneStatus())
        }
    }

    playAgain = () => {
        this.setState(Game.initialState)
    }

    render() {
        const {selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state
        return (
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
                <div id="rules">
                    <h3><b>But de jeu</b></h3>
                    <p>Le but du jeu est de choisir un ou plusieurs nombres, pour que leur somme corresponde au nombre
                        d'étoile affiché.</p>

                    <h3>Comment jouer ?</h3>

                    <ul>
                        <li>Cliquer sur les nombres pour les sélectionner. Vous pouvez recliquer dessus (dans la partie
                            droite) pour les déselectionner.
                        </li>
                        <li>Une fois votre choix effectué, cliquer sur le bouton égal. Deux scénarios s'imposent :
                            <ul>
                                <li>Si la somme des nombres est équivalente au nombre d'étoile, le bouton égal devient
                                    vert. Vous pouvez recliquer dessus pour valider, ou sélectionner d'autres nombres.
                                </li>
                                <li>Si c'est pas équivalent, le bouton égal devient rouge. Vous devez sélectionner une
                                    autre combinaison de nombre.
                                </li>
                                <li>Si vous êtes bloqué, vous pouver cliquer sur le bouton orange pour regénérer
                                    aléatoirement des étoiles. Vous ne pouvez le faire que 5 fois.
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <h3>Fin du jeu :</h3>
                    <ul>
                        <li> Si vous avez réussi à utiliser tous les nombres, vous gagnez</li>
                        <li>Si vous êtes bloqué et que vous n'avez plus de chance pour rafraichir les étoiles, vous
                            perdez
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Game