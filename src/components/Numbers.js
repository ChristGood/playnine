import React from 'react';
import _ from 'lodash';

class Numbers extends React.Component {

    state = {number: 0}

    numberClassName = (number) => {
        if(this.props.usedNumbers.indexOf(number) >= 0) {
            return 'used'
        }
        if(this.props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected'
        }
    }

    render() {
        return(
            <div className="card text-center">
                <div>
                    {_.range(1,10).map(number=>
                        <span key={number} className={this.numberClassName(number)}
                              onClick={() => this.props.selectNumber(number)}
                        >{number}</span>
                    )}
                </div>
            </div>
        )
    }
}

export default Numbers