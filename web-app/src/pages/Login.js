import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import * as env from "../env";
import * as UserActions from "../actions/UserActions";
import * as ParamActions from "../actions/ParamActions";
import ParamStore from "../stores/ParamStore";

class Login extends Component {
    constructor() {
        super ()
        this.state = {
            username: '',
            password: '',
            banner: <div></div>
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    submit() {
        const { username, password } = this.state;
        axios.post(`${env.API_URL}/authenticate`, { username, password })
            .then(res => {
                const { success, message, userId, areas } = res.data;
                if (success) {
                    UserActions.setUserId(userId);
                    ParamActions.fetchParam(areas[0].pit,areas[0].location);
                    ParamActions.fetchParamHistory(areas[0].pit,areas[0].location);
                }
                else {
                    this.setState({
                        username: '',
                        password: '',
                        banner: <div><p className="alert alert-danger">{message}</p></div>
                    });
                }
            })
            .then(res => {
                console.log(ParamStore.getPit())
                this.props.history.push("/")
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                {this.state.banner}
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.onUsernameChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.onPasswordChange} />
                </div>
                <button className="btn btn-success" id="submit" onClick={this.submit}>Login</button>
                <p>Don't have an account? Register <Link to="/register">here</Link>.</p>
            </div>
        );
    }
}

export default Login;