import React, { Component } from 'react';
import {Router, Route, Link, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ListUser from './ListUser';
import FormUser from './FormUser';

const history = createBrowserHistory();

export default class CRUD extends Component {
    render() {
        return (
            <Router history={history}>
                <Link to="/react">List User</Link><br/>
                <Link to="/react/add">Add User</Link><br/>

                <Switch>
                    <Route path="/react" exact component={ListUser} />
                    <Route path="/react/add" exact component={FormUser} />
                </Switch>
            </Router>
        );
    }
}
