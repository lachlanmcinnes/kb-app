import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import UserStore from "../../stores/UserStore";
import * as UserActions from "../../actions/UserActions";

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthorised: UserStore.getUserId() !== "" ? true : false,
            user: UserStore.getUsername()
        };
        this.onUserStoreChange = this.onUserStoreChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        UserStore.on("change", this.onUserStoreChange);
    }

    componentWillUnmount() {
        UserStore.removeListener("change", this.onUserStoreChange);
    }

    onUserStoreChange() {
        this.setState({
            isAuthorised: UserStore.getUserId() !== "" ? true : false,
            user: UserStore.getUsername()
        })
    }

    logout(e) {
        UserActions.setUserId("");
        UserActions.setUsername("");
    }

    render() {
        const authorisedNavBar =
            <div className="collapse navbar-collapse" id="expanded-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history-param">History Parameters</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-param">Add Parameter</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/edit-param">Edit Parameter</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={this.logout}>Logout</Link>
                    </li>
                </ul>
                <span id="welcome-message">
                    Welcome, {this.state.user}.
                </span>
            </div>

        const unauthorisedNavBar = 
            <div className="collapse navbar-collapse" id="expanded-nav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            </div>

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Enviro Database</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#expanded-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {this.state.isAuthorised
                        ? authorisedNavBar
                        : unauthorisedNavBar
                    }
                </nav>
            </div >
        );
    }
}

export default Navigation;