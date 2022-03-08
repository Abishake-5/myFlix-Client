import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


class MainView extends React.Component {
    constructor() {
        super();
        //Initial start is set to null
        this.state = {
            movies: [],
            seletedMovie: null,
            user: null
        };
    }
    componentDidMount() {
        axios.get('https://fast-atoll-69428.herokuapp.com/movies')
            .then(Response => {
                this.setState({
                    movies: Response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    /* When a user successfully logs in, this function updates the `user` property in state to that particular user*/
    onLoggedIn(user) {
        this.setState({
            user
        });
    }
    
    
    render() {
        const { movies, selectedMovie, user } = this.state;
        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
        // Before the movies have been loaded
       
        return (
            <div className="main-view">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? (
                        <Row className="justify-content-md-center">
                            <Col md={8} >
                            <MovieView 
                            key={movies._id}
                            movie={selectedMovie} 
                            onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                            </Col>
                        </Row>
                    )
                    :(
                    <Row className="justify-content-md-center">
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