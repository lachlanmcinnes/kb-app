import axios from "axios";
import dispatcher from "../dispatcher";

import * as env from "../env";

export function setUserId(userId) {
    dispatcher.dispatch({
        type: "SET_USERID",
        userId
    });
}

export function setUsername(username) {
    dispatcher.dispatch({
        type: "SET_USERNAME",
        username
    });
}

export function setDepartment(department) {
    dispatcher.dispatch({
        type: "SET_DEPARTMENT",
        department
    });
}

export function fetchUser(userId) {
    axios.get(`${env.API_URL}/users/${userId}/details`)
        .then(res => {
            res = res.data;
            if (res.success) {
                dispatcher.dispatch({
                    type: "SET_USERID",
                    userId
                });
                dispatcher.dispatch({
                    type: "SET_USERNAME",
                    username: res.username
                });
                dispatcher.dispatch({
                    type: "SET_DEPARTMENT",
                    department: res.department
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err}.`);
        })
}