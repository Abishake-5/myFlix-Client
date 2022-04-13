import React from "react";
import PropTypes from "prop-types";
import { DirectorView } from "../director-view/director-view";
import axios from 'axios'
import { Link } from 'react-router-dom';


import "./movie-view.scss"

import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { DirectorView } from "../director-view/director-view";
import heartFilled from '../../../img/heart-filled.png'
import heartEmpty from '../../../img/heart-empty.png'



export class MovieView extends React.Component {
  constructor( props ) {
      super( props )
        this.state = {
           user: null
        };
        // console.log(this.props)
    }

componentDidMount(){
   const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.get(`https://nameless-bayou-89739.herokuapp.com/users/${this.props.username}`, {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
      console.log(response.data , " response")
    // Assign the result to the state
    this.setState({
      user: response.data
    });
    console.log(this.state.user, "user")
  })
  .catch(error =>  console.log(error));
}

addToFavorite= () => {
  let token = localStorage.getItem('token');
    console.log(token)
     axios
            .post(
                `https://nameless-bayou-89739.herokuapp.com/users/${this.props.username}/${this.props.movie._id}`,
                {
                    headers: { 
                        "Authorization": `Bearer ${token}` 
                    },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Movie Added");
            })
            .catch( error => console.log(error));
}




render() {
    const { username, movie, onBackClick } = this.props;
        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="movie-view">
                            <Card.Body>
                            <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                            <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                            <Card.Text id="movie-description" className="movie-description">
                                {movie.Description}</Card.Text>

                      <Link to={`/directors/${movie.Director.Name}`}>
                            <Card.Text id="movie-director" className="movie-director">
                            Director: {movie.Director.Name}</Card.Text>
                        </Link>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Card.Text id="movie-genre" className="movie-gerne">
                                Genre: {movie.Genre.Name}</Card.Text>
                            </Link>
                  {favMovie ?  <img src={heartEmpty} style={{width: "50px"}}/> : <img src={heartFilled} style={{width: "50px"}}/>}
                            </Card.Body>
                        </Card>
                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                        <Button id="movie-view-button" onClick={this.addToFavorite}>Add to favorites</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
            BirthDay: PropTypes.string,
        }),
        Actors: PropTypes.array,
        ImagePath: PropTypes.string.isRequired
    })
    
};

