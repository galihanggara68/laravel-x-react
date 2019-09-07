import React, {Component} from 'react';
import axios from 'axios';

class FormUser extends Component{
    constructor(){
        super();

        // Set states for store user data
        this.state = {
            username: "",
            password: ""
        };

        // Bind all Event Handler
        this.inputChange = this.inputChange.bind(this);
        this.addClick = this.addClick.bind(this);
    }

    // Method to handle input change
    inputChange(e){
        const {id, value} = e.target; // Get id and value from e.target object
        this.setState({[id]: value}); // Set state based on input that trigger change event
    }

    // Method to handle button click
    addClick(e){
        const {username, password} = this.state; // Get username and password from this.state object
        axios.post("http://localhost:8000/api/react", // Post data to backend
            // Set request body data
            {
                username: username,
                password: password
            }
        ).then(response => { // Get response from Post request
            alert(response.data); // Show alert
            this.setState({username: "", password: ""}); // Clear the input when data successfully inserted
            this.props.history.push("/react");
        });
    }

    // Render our lovely form input
    render(){
        return (
            <>
                <input type="text" 
                    id="username"
                    value={this.state.username} 
                    onChange={this.inputChange}/>
                <input type="password" 
                    id="password"
                    value={this.state.password} 
                    onChange={this.inputChange}/>
                <input type="button" 
                    value="Add" 
                    onClick={this.addClick}/>
            </>
        );
    }
}

export default FormUser;