import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./main-view.scss"
import {Container, Navbar, Nav, Dropdown, Button} from 'react-bootstrap'
import { BrowserRouter as Router , Route, Redirect, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import{ ProfileView } from '../profile-view/profile-view'
import { DirectorView } from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view'
import { RegistrationView } from '../registration-view/registration-view'

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
 /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
 setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

  render() {
        const { movies, user } = this.state;

        return (
 <Router>
      <Container>
       {user && (     
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
      </Navbar>)}
      
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) {
                                return <Redirect to="/login" />;
                            }

                            return (
                                <>
                                    {movies.map(movie => (
                                        <Col md={3} key={movie._id}>
                                            <MovieCard movie={movie} onMovieClick={() => {}} />
                                        </Col>
                                    ))}
                                </>
                            );
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
                </Container>
            </Router>
        );
    }
}
export default MainView;