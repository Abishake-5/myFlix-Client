import React from 'react'
import { Link } from 'react-router-dom';
import './genre-view.scss'
import {Container, Card, Button, Row} from 'react-bootstrap';

export class GenreView extends React.Component{
  componentDidMount(){
    console.log(this.props)
  }
  render(){
    const {genre, movies, onBackClick} = this.props
    return(
      <Container>
        <Card.Body>
          <Card.Title> Genre</Card.Title>
          <Card.Text>
            <span className='label'>Name: </span>
             <span className="value">{genre.Name}</span>
          </Card.Text>
          <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
        </Card.Body>
        <Row>
                    {movies.map(movie => (
                        <Card className="favorite-movie card-content" key={movie._id} >
                            <Card.Img
                                className="genre-imgs"
                                variant="top"
                                src={movie.ImagePath} />
                            <Card.Body style={{ 
                              backgroundColor: "black",
                              color: "white"
                              }}>
                                <Card.Title className="movie_title">
                                    {movie.Title}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
      </Container>
    )
  }
}