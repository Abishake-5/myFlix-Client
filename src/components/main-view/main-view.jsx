import React from 'react';
import axios from 'axios';
import {Route, Switch, Link, Redirect} from 'react-router-dom';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Container, Navbar, Nav, Dropdown, Button} from 'react-bootstrap'
import "./main-view.scss"

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import{ ProfileView } from '../profile-view/profile-view'
import { RegistrationView } from '../registration-view/registration-view'
import {DirectorView} from '../director-view/director-view'
import GenreView from '../genre-view/genre-view';


class MainView extends React.Component {
    constructor() {
        super();
        //Initial start is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }
    
getMovies(token) {
  axios.get('https://nameless-bayou-89739.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(error =>  console.log(error));
}
componentDidMount() {
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
  console.log(authData, " =>  Main View");
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
 /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
 setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

 render() {
        const { movies, selectedMovie, user } = this.state;
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
       
        return (
<div className="main-view">
  <Container>
      <Navbar expand="lg" variant="light" bg="light" sticky="top">
            <Container>
                  <Nav.Link href="/">MY-FLIX</Nav.Link>
                      <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">{user}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Link to='/profile' className="mr-2">
                                          Account
                                    </Link>
                                </Dropdown.Menu>
                        </Dropdown>
                 <Button  onClick={() => { this.onLoggedOut() }}>Logout</Button>
            </Container>
      </Navbar>
</Container>
<Switch>
    <Route exact path='/' render={() => (
selectedMovie?// IF
( <Row className="justify-content-md-center">
        <Col md={8} >
          <MovieView 
              key={movies._id}
              movie={selectedMovie} 
              onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
    </Row>
)
:// Else
( <Row className="justify-content-md-center">
{ movies.map(movie => (
    <Col md={3}>
        <MovieCard 
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
    </Col>
))}
</Row>
)

)} />
<Route exact path='/profile'  render={() => <ProfileView  / >}  / >

<Route exact path="/login" render={() => {
    if (user) {
        return <Redirect to="/" />;
    }
    return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
}} />

<Route exact path="/register" render={() => {
    if (user) {
        return <Redirect to="/" />;
    }
    return <RegistrationView />
}} />
{/*  This should render The Registration view on my log in page */}
<Route exact path="/directors/:name" render={({ match }) => {
  if (movies.length === 0) return <div className="main-view" />;
  return <Col md={8}>
    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
  </Col>
}
} />


<Route exact path='/genre/:name' render={() => <GenreView />} />
<Route path="/movies/:movieId" render={({ match, history }) => {
  return <Col md={8}>
    <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
  </Col>
}} />





</Switch>
</div>
        );
    }
}
export default MainView;


              