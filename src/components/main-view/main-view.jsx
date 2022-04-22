import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import "./main-view.scss"
import {Container, Navbar, Nav, Dropdown, Button} from 'react-bootstrap'
import { BrowserRouter as Router , Route, Redirect, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setMovies, setFilter } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list'
import VisibilityFilterInput from '../visibility-filter-input/Visibility-filter-input';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import{ ProfileView } from '../profile-view/profile-view'
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view'
import { RegistrationView } from '../registration-view/registration-view'

import userImg from '../../img/user.png'
import logout from '../../img/logout.png'
import logo from '../../img/logo.png'


class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
    }
    
getMovies(token) {
  axios.get('https://nameless-bayou-89739.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
this.props.setMovies(response.data)
  })
  .catch(error =>  console.log(error));
}

componentDidMount() {
console.log(setFilter)
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user')
    });
    this.getMovies(accessToken);
  }
}
    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.userName
  });
  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.userName);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}
visibilityFilterInput = (props) => <div> props.data</div>


  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
{user && (     
   <Navbar className='navBar' expand="lg" variant="light" bg="light" sticky="top">
    <Container>
                        <Nav.Link href="/">
                            <img src={logo} alt='logo' className='logo' style={{marginLeft: "-65px", width:"200px"}}/>
                        </Nav.Link>
                        <VisibilityFilterInput />
                <Dropdown className='drop' style={{marginLeft:"20px"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src={userImg} className='userImg' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to='/profile' className="mr-2">
                                       <img src={userImg} className='userImg dropdownImgs' />
                                    Account
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to='/login' className="mr-2">
                                    <div onClick={() => { this.onLoggedOut() }}>
                                       <img src={logout} className='logout dropdownImgs' />
                                       Logout
                                     </div>
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
            </Dropdown>
    </Container>
      </Navbar>
     )}

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            
            return <MoviesList movies={movies}/>;
          }} />

<Route path="/login" render={() => {
    if (user) {
        return <Redirect to="/" />;
    }
    return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
}} />
 <Route path="/register" render={({match, history}) => {
    if (!user) {
            return (
        <Col>
            <RegistrationView   user={user} onBackClick={() => history.goBack()} />
        </Col>
    );
        
    }
return <Redirect to="/" />;

}} />
<Route path="/movies/:movieId" render={({ match, history }) => {
    if (!user) {
        return (
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        );
    }

    if (movies.length === 0) {
        return <div className="main-view" />;
    }

    return (
        <Col md={8}>
            <MovieView
                username={user}
                movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
        </Col>
    );
}} />
<Route path="/profile" render={({ history }) => {
    if (!user) {
        return (
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        );
    }

    return (
        <Col md={8}>
            <ProfileView movies={movies} onBackClick={() => history.goBack()} />
        </Col>
    );
}} />
<Route path="/genres/:name" render={({ match, history }) => {
    if (!user) {
        return (
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        );
    }


    if (movies.length === 0) {
        return <div className="main-view" />;
    }

    return (
        <Col md={8}>
            <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()}
                movies={movies.filter(movie => movie.Genre.Name === match.params.name)}/>
        </Col>
    )
}} />
<Route path="/directors/:name" render={({ match, history }) => {
    if (!user) {
        return (
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        );
    }
    if (movies.length === 0) return <div className="main-view" />;
    return (
        <Col md={8}>
            <DirectorView
                director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()}
                movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
        </Col>
    );
}} />
        </Row>
      </Router>
          );
  }
}

let mapStateToProps = state => {
  return {
       movies: state.movies,
       filteredList: state.state
    }
}

export default connect(mapStateToProps, { setMovies, setFilter } )(MainView);