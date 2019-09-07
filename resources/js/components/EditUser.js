import React, {Component} from 'react';
import axios from 'axios';

class EditUser extends Component{
    constructor(){
        super();

        // Let's book another room for user before manipulate them
        this.state = {
            id: 0,
            username: "",
            password: ""
        };

        // Keep watching to all handlers
        this.inputChange = this.inputChange.bind(this);
        this.updateClick = this.updateClick.bind(this);
    }

    // Method to handle input change
    inputChange(e){
        const {id, value} = e.target; // Get id and value from e.target object
        this.setState({[id]: value}); // Set state based on input that trigger change event
    }

    // Ow, i clicked the update button.
    updateClick(e){
        const {id, username, password} = this.state; // Get id, username, and password from this.state object
        axios.patch(`http://localhost:8000/api/react/${id}`, // Patch data to backend
            // Set request body data
            {
                username: username,
                password: password
            }
        ).then(response => { // Get response from Patch request
            alert(response.data); // Tell me buddy
            this.setState({username: "", password: ""}); // Good idea to clean the dirty input
            this.props.history.push("/react"); // [Redirect] Let's redirect user to user list
        });
    }

    // Start operate
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
    // Remember "DRY" (Don't Repeat Yourself)
    // Make it reusable as possible, remember ?
    getUser(){
        const {id} = this.props.match.params;
        axios.get(`http://localhost:8000/api/react/${id}`)
        .then(response => this.setState(
            {
                id: response.data.id,
                username: response.data.username, 
                password: response.data.password
            }
        )); // Store it
    }

    // Render our lovely form
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
                    value="Update" 
                    onClick={this.updateClick}/>
            </>
        );
    }
}

// Wait, we don't export the class ? What kind of animal 'withRouter' is ?
// Take a breathe and open your eyes then pay attention.
// withRouter method is used to push history to root Router in our CRUD Component
// in other words, we will redirect user to user list. Look at [Redirect]
export default EditUser;