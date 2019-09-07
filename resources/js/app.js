import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap';
import CRUD from './components/CRUD';

const App = () => (
    <>
        <CRUD />
    </>
);


ReactDOM.render(<App />, document.getElementById('app'));