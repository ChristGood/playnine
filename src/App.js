import React from 'react';
import './css/font-awesome.css';
import './css/bootstrap.min.css';
import './App.css';
import {Game} from './components';
class App extends React.Component {
    state = {

    }

    render() {
        return(

            <div>
                <Game />
            </div>
        )
    }
}

export default App;
