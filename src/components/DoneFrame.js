import React from 'react';

const DoneFrame = (props) => {
    return(
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button
                className="btn btn-primary"
                onClick={props.playAgain}><i className="fa fa-play"></i> Play Again</button>
        </div>
    )
}

export default DoneFrame