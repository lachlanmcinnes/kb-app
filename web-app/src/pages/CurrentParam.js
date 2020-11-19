import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ParamStore from "../stores/ParamStore";
import UserStore from "../stores/UserStore";

import Param from "../models/param";

class Params extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pit: ParamStore.getPit(),
            location: ParamStore.getLocation(),
            knowledgebase: ParamStore.getKnowledgeBase(),
            georisk: ParamStore.getGeoRisk(),
            prelimdesign: ParamStore.getPrelimDesign(),
            engagement: ParamStore.getEngagement(),
            commitment: ParamStore.getCommitment(),
            banner: <div></div>
        }
        this.bannerTimeout = null;
    }

    setBanner(banner) {
        if (this.bannerTimeout) {
            clearTimeout(this.bannerTimeout);
        }
        this.setState({ banner });
        this.bannerTimeout = setTimeout(() => {this.setState({banner: <div></div>})}, 5000)
    }

    render() {
        return (
            <div>
                {
                    UserStore.getUserId() === ''
                        ? <Redirect to={{ pathname: "/login" }} />
                        : <div>
                            {this.state.banner}
                            <h1>Parameters</h1>
                            {
                                this.state.pit != ''
                                    ? 
                                        <p>hello</p>  
                                    : 
                                        <p>No Parameters.</p>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Params;