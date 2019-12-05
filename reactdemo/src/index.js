import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Controller from './Controller'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routing = (
    <Router>
        <div>
            <center>
            <table>
                <tr>
                    <td>
                        <Link to='/Home'>Home</Link>
                    </td>
                    <td> |
                    </td>
                    <td>
                        <Link to='/Controller'>CRUD</Link>
                    </td>
                </tr>
            </table>
            </center>
            <Route exact path="/Home" component={App} />
            <Route exact path="/Controller" component={Controller} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
