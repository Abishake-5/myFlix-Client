import React  from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Route} from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

const store = createStore(moviesApp, devToolsEnhancer());
class MyFlixApplication extends React.Component {
  
render(){
    return(
        <Provider store={store}>
            <Container>
                <Router>
                    <MainView />
                </Router>
            </Container>
        </Provider>
    )
}
    }

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);