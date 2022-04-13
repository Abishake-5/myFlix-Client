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

onDeleteUser() {
      const Username = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios
          .delete(`https://nameless-bayou-89739.herokuapp.com/users/${Username}` , {
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

  editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .put(
                `https://nameless-bayou-89739.herokuapp.com/users/${Username}` ,
                {
                    userName: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    BirthDay: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });
                console.log("Updated User" , response)
                localStorage.setItem('user', this.state.Username);
                 localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert("Profile updated Please Login again");
                window.open('/profile', '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    };
  setUsername(value) {
        this.setState({
            Username: value,
        });
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

     onRemoveFavorite = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .delete(
                `https://nameless-bayou-89739.herokuapp.com/users/${Username}/${movie._id}`,
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

 
render(){
const { movies, onBackClick } = this.props;
const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;
  return(
<>
 <Container className="profile-view" align="center">
                <Row>
                    <Col>
                        <Card className="update-profile">
                            <Card.Body>
                                <Card.Title>Profile</Card.Title>
                                <Form
                                    className="update-form"
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            value={Username}
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            autoComplete="on"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Email"
                                            value={Email}
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            value={Birthday}
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <div className="mt-3">
                                        <Button variant="success" type="submit" onClick={this.editUser}>Update User</Button>
                                        <Button className="ml-3" variant="secondary" onClick={() => this.onDeleteUser()}>Delete User</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    
                    </Container>
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