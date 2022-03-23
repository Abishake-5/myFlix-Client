import React  from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Route} from 'react-router-dom';



// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';
import { ProfileView } from './components/profile-view/profile-view';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 1

        };
    }
    componentDidMount(){
        console.log(this.state.num)

    }
    render() {

        return (
        
            <Router>
               <Container>
                        {/* <Route exact path='/profile' component={ProfileView}/> 
                        <Route exact path='/' render={()=> }/> */}
                        <MainView />
               </Container>
            </Router>
        );
    }
getUser( user ){
console.log(user)
}
}


// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);