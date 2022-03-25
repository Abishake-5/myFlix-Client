import axios from "axios";
import React from "react";
import PropTypes from 'prop-types';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component{
 constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavMovies: [],
        };
    }
    
componentDidMount(){
   const accessToken = localStorage.getItem('token');
   console.log(accessToken)
  this.getUser(accessToken);
}
getUser = (token) =>{
const Username = localStorage.getItem('user');
  axios.get(`https://nameless-bayou-89739.herokuapp.com/users/${Username}` , {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    console.log(res)
this.setState({
  Username: res.data.userName,
  Password: res.data.Password,
  Email: res.data.Email,
  Birthday: res.data.BirthDay,
  FavMovies: res.data.FavMovies,
});
  }).catch(error => console.log(error))
};



render(){
const { movies, onBackClick } = this.props;
const { FavoriteMovies, Username, Email, Birthday } = this.state;
  return(
    <>
  <h1> {Username}</h1>
    </>
    
  )
  
}

}
ProfileView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string,
            Death: PropTypes.string,
            Name: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    onBackClick: PropTypes.func.isRequired
};