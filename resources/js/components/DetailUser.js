import React, {Component} from 'react';
import axios from 'axios';

class DetailUser extends Component{
    constructor(){
        super();

        // Book a room for introgate a user
        this.state = {
            user: {}
        };
    }

    // Start asking about user information to server
    componentDidMount(){
        this.getUser();
    }

    // Oh wait, how if the parameter is changed. Nooo, we can't get the data.
    // Just kidding, we can use this method below to handle if the parameter is changed
    componentDidUpdate(prevProps){
        // Check if the parameter id is changed, if yes, get the user.
        if(this.props.match.params.id != prevProps.match.params.id){
            this.getUser();
        }
    }

    // Oh yeah, about this method.
    // We must keep this principle "DRY" (Don't Repeat Yourself)
    // Make it reusable as possible, remember ?
    getUser(){
        const {id} = this.props.match.params;
        axios.get(`http://localhost:8000/api/react/${id}`)
        .then(response => this.setState({user: response.data})); // Store it
    }
    
    render(){
        // Get id, username, and password from user state
        const {id, username, password} = this.state.user;
        return (
            <>
                <p>ID : {id}</p>
                <h3>Username : {username}</h3>
                <h4>Password : {password}</h4>
            </>
        );
    }
}

export default DetailUser;