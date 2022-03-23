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
  console.log(Username, userName)
}
getUser = (token) =>{
const Username = localStorage.getItem('user');
  axios.get(`https://nameless-bayou-89739.herokuapp.com/users/${Username}` , {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
this.setState({
  Username: res.data.userName,
  Password: res.data.Password,
  Email: res.data.Email,
  Birthday: res.data.BirthDay,
  FavMovies: res.data.FavMovies,
});
  }).catch(error => console.log(error))
};

editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
  
axios.put(`https://nameless-bayou-89739.herokuapp.com/users/${Username}`,{
  Username: this.state.userName,
  Password: this.state.Password,
  Email: this.state.Email,
  Birthday: this.state.BirthDay,
},{ headers: { Authorization: `Bearer ${token}`},
}.then((res) =>{
  this.setState({
    Username: res.data.userName,
    Password: response.data.Password,
    Email: response.data.Email,
    Birthday: response.data.BirthDay,
  });
  localStorage.setItem('user', this.state.Username)
  alert('Profile Updated');
  window.open('/profile', '_self');
}).catch(error => console.log(error))
)};

 onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://orishflix.herokuapp.com/users/${Username}/movies/${movie._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Deregister
    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .delete(`https://orishflix.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value,
        });
        console.log(Username)
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
    }

    setEmail(value) {
        this.setState({
            Email: value,
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        });
    }

render(){
const { movies, onBackClick } = this.props;
const { FavoriteMovies, Username, Email, Birthday } = this.state;

  if (!Username){
    return  null; 
  }
  return(
    <>
  <h1> hi</h1>
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
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired,
            Name: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    onBackClick: PropTypes.func.isRequired
};