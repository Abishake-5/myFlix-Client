import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Card, Button, Row} from 'react-bootstrap';

export class DirectorView extends React.Component{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        const { director, movies, onBackClick} = this.props
        return(
 <Container>
        <Card.Body>
          <Card.Title> Director</Card.Title>
          <Card.Text>
            <span className='label'>Name: </span>
             <span className="value">{director.Name}</span>
          </Card.Text>
               <Card.Text>
              <span className="label">Birth: </span>
              <span className="value">{director.Birthday ? director.Birthday : "?"}</span>
          </Card.Text>
          <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={() => { onBackClick(); }}>Back</Button>
        </Card.Body>
        <Row>
                    {movies.map(movie => (
                        <Card className="favorite-movie card-content" key={movie._id} >
                            <Card.Img
                                className="director-imgs"
                                variant="top"
                                src={movie.ImagePath} />
                            <Card.Body style={{ 
                                backgroundColor: "black" ,
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