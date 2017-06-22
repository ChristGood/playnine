import React from 'react';

const Button = (props) => {

    let button
    switch(props.answerIsCorrect) {
        case true:
            button = <button
                onClick={props.acceptAnswer}
                className="btn btn-success"
                disabled={props.selectedNumbers.length === 0}>
                <i className="fa fa-check"></i>
            </button>
            break;
        case false:
            button = <button
                className="btn btn-danger"
                disabled={props.selectedNumbers.length === 0}>
                <i className="fa fa-times"></i>
            </button>
            break;
        default:
            button = <button
                className="btn btn-secondary"
                disabled={props.selectedNumbers.length === 0}
                onClick={props.checkAnswer}>
                =
            </button>
            break;
    }

    return(
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button disabled={props.redraws === 0} className="btn btn-warning" onClick={props.redraw}>
                <i className="fa fa-refresh"></i> {props.redraws}
            </button>
        </div>
    )
}

export default Button