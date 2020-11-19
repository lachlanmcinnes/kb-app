import axios from "axios";
import dispatcher from "../dispatcher";

import * as env from "../env";

export function setPit(pit) {
    dispatcher.dispatch({
        type: "SET_PIT",
        pit
    });
}

export function setLocation(location) {
    dispatcher.dispatch({
        type: "SET_LOCATION",
        location
    });
}

export function setKnowledgeBase(knowledgebase) {
    dispatcher.dispatch({
        type: "SET_KNOWLEDGEBASE",
        knowledgebase
    });
}

export function setGeoRisk(georisk) {
    dispatcher.dispatch({
        type: "SET_GEORISK",
        georisk
    });
}

export function setPrelimDesign(prelimdesign) {
    dispatcher.dispatch({
        type: "SET_PRELIMDESIGN",
        prelimdesign
    });
}

export function setEngagement(engagement) {
    dispatcher.dispatch({
        type: "SET_ENGAGEMENT",
        engagement
    });
}

export function setCommitment(commitment) {
    dispatcher.dispatch({
        type: "SET_COMMITMENT",
        commitment
    });
}

export function setRevision(revision) {
    dispatcher.dispatch({
        type: "SET_REVISION",
        revision
    });
}

export function fetchParam(pit,location) {
    axios.get(`${env.API_URL}/param/${pit}/${location}`)
        .then(res => {
            res = res.data;
            if (res.success) {
                dispatcher.dispatch({
                    type: "SET_PIT",
                    pit
                });
                dispatcher.dispatch({
                    type: "SET_LOCATION",
                    location
                });
                dispatcher.dispatch({
                    type: "SET_KNOWLEDGEBASE",
                    knowledgebase: res.knowledgebase
                });
                dispatcher.dispatch({
                    type: "SET_GEORISK",
                    georisk: res.georisk
                });
                dispatcher.dispatch({
                    type: "SET_PRELIMDESIGN",
                    prelimdesign: res.prelimdesign
                });
                dispatcher.dispatch({
                    type: "SET_ENGAGEMENT",
                    engagement: res.engagement
                });
                dispatcher.dispatch({
                    type: "SET_COMMITMENT",
                    commitment: res.commitment
                });
                dispatcher.dispatch({
                    type: "SET_REVISION",
                    revision: res.revision
                });
            }
        })
        .catch(err => {
            console.log(`Error: ${err}.`);
        })
}