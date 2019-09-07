import React, {Component} from 'react';
import {Router, Route, Link, Switch} from 'react-router-dom';
// This library is used to create browser history, so we can forward or backward
// to previous page
import {createBrowserHistory} from 'history';
import axios from 'axios';

import DetailUser from './DetailUser';
import EditUser from './EditUser';
import ModalDeleteUser from './ModalDeleteUser';

const history = createBrowserHistory();

class ListUser extends Component{
    constructor(){
        super();

        // Let's book a room for our users
        this.state = {
            users: []
        };
    }
    
    // When component is ready to render, we have done with request data to server
    // Since componentWillMount lifecycle is deprecated and unsafe we will use this one
    componentDidMount(){
        this.getUsers();
    }

    // Hey dude, refresh the list
    componentDidUpdate(prevProps){
        this.getUsers();
    }

    getUsers(){
        axios.get("http://localhost:8000/api/react") // Get users data from server
        .then(response => this.setState({users: response.data})); // Let's tell users to enter the room
    }

    // Show all users 
    render(){
        return (
            <Router history={history}>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>
                            {user.username}
                            <Link to={`/react/${user.id}`}>| Detail | </Link>
                            <Link to={`/react/${user.id}/edit`}>| Edit |</Link>
                            <Link to={`/react/${user.id}/delete`}> Delete</Link>
                        </li>
                    ))}
                </ul>
                
                <Switch>
                    <Route path="/react/:id" exact component={DetailUser} />
                    <Route path="/react/:id/edit" exact component={EditUser} />
                    <Route path="/react/:id/delete" exact component={ModalDeleteUser} />
                </Switch>
            </Router>
        );
    }
}

export default ListUser;