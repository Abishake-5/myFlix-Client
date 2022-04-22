import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './movie-card.scss'
import { Link} from 'react-router-dom'

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
         return (
           <div onClick={() => onMovieClick(movie)} 
              className="movie-card">
                <Card>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                        <Card.Text>Director: {movie.Director.Name}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                           <Button variant="link">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
              </div>
            )
    }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func
};