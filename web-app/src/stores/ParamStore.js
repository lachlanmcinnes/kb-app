import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ParamStore extends EventEmitter {
    constructor() {
        super()
        this.pit = "";
        this.location = "";
        this.knowledgebase = [];
        this.georisk = [];
        this.prelimdesign = [];
        this.engagement = [];
        this.commitment = [];
        this.revision = "";
        this.history = []
    }

    getPit() {
        return this.pit;
    }

    getLocation() {
        return this.location;
    }

    getKnowledgeBase() {
        return this.knowledgebase;
    }

    getGeoRisk() {
        return this.georisk;
    }

    getPrelimDesign() {
        return this.prelimdesign;
    }

    getEngagement() {
        return this.engagement;
    }

    getCommitment() {
        return this.commitment;
    }

    getRevision() {
        return this.revision;
    }

    getHistory() {
        return this.history;
    }


    handleActions(action) {
        switch (action.type) {
            case "SET_PIT": {
                this.pit = action.pit;
                this.emit("change");
                break;
            }
            case "SET_LOCATION": {
                this.location = action.location;
                this.emit("change");
                break;
            }
            case "SET_KNOWLEDGEBASE": {
                this.knowledgebase = action.knowledgebase;
                this.emit("change");
                break;
            }
            case "SET_GEORISK": {
                this.georisk = action.georisk;
                this.emit("change");
                break;
            }
            case "SET_PRELIMDESIGN": {
                this.prelimdesign = action.prelimdesign;
                this.emit("change");
                break;
            }
            case "SET_ENGAGEMENT": {
                this.engagement = action.engagement;
                this.emit("change");
                break;
            }
            case "SET_COMMITMENT": {
                this.commitment = action.commitment;
                this.emit("change");
                break;
            }
            case "SET_REVISION": {
                this.revision = action.revision;
                this.emit("change");
                break;
            }
            case "SET_HISTORY": {
                this.history = action.history;
                this.emit("change");
                break;
            }
            default: {
                break;
            }
        }
    }
}

const paramStore = new ParamStore();
dispatcher.register(paramStore.handleActions.bind(paramStore))

export default paramStore;