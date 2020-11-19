import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class UserStore extends EventEmitter {
    constructor() {
        super()
        this.userId = "";
        this.username = "";
        this.department = "";
    }

    getUserId() {
        return this.userId;
    }

    getUsername() {
        return this.username;
    }

    getDepartment() {
        return this.department;
    }

    handleActions(action) {
        switch (action.type) {
            case "SET_USERID": {
                this.userId = action.userId;
                this.emit("change");
                break;
            }
            case "SET_USERNAME": {
                this.username = action.username;
                this.emit("change");
                break;
            }
            case "SET_DEPARTMENT": {
                this.department = action.department;
                this.emit("change");
                break;
            }
            default: {
                break;
            }
        }
    }
}

const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore))

export default userStore;