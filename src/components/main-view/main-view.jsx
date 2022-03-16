import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./main-view.scss"
import { BrowserRouter as Router , Route, Routes, Switch, Link } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import{ ProfileView } from '../profile-view/profile-view'


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
        const { movies, selectedMovie, user } = this.state;
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
       
        return (
          
           <div className="main-view">
                  <nav>
                    <ul className='nav-links'>
                        <li  onClick={() => { this.onLoggedOut() }}>LOG-OUT</li>
                      </ul>
                  </nav>
                {selectedMovie
                    ?
                    // IF
                     ( <Row className="justify-content-md-center">
                            <Col md={8} >
                            <MovieView 
                            key={movies._id}
                            movie={selectedMovie} 
                            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    :
// Else
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
                }
            </div>
 

        );
    }
}
export default MainView;