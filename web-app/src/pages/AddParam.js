import React, { Component } from 'react';
import axios from 'axios';

import * as ParamActions from "../actions/ParamActions";
import * as env from "../env";

class AddParam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pit: '',
            location: '',
            knowledgebase: [],
            georisk: [],
            prelimdesign: [],
            engagement: [],
            commitment: [],
            banner: <div></div>
        }
    }

    onPitChange(e) {
        this.setState({
            pit: e.target.value
        });
    }

    onLocationChange(e) {
        this.setState({
            location: e.target.value
        });
    }

    onKnowledgeBaseChange(e){
        let k = this.state.knowledgebase;
        k.push(e)
        this.setState({
            knowledgebase: k
        });
    }

    onGeoRiskChange(e) {
        this.setState(state => {
            state.georisk.push(e);
        });
    }

    onPrelimDesignChange(e) {
        this.setState(state => {
            state.prelimdesign.push(e);
        });
    }

    onEngagementChange(e) {
        this.setState(state => {
            state.engagement.push(e);
        });
    }

    onCommitmentChange(e) {
        this.setState(state => {
            state.commitment.push(e);
        });
    }

    submit() {
        const { pit, location, knowledgebase, georisk, prelimdesign, engagement, commitment } = this.state;
        const params = {
            pit,
            location,
            knowledgebase,
            georisk,
            prelimdesign,
            engagement,
            commitment
        };
        axios.post(`${env.API_URL}/param/add-param`, params)
                .then(res => {
                    const { success, message } = res.data;
                    if (success) {
                        ParamActions.setPit(pit);
                        ParamActions.setLocation(location);
                        ParamActions.setKnowledgeBase(knowledgebase);
                        ParamActions.setGeoRisk(georisk);
                        ParamActions.setPrelimDesign(prelimdesign);
                        ParamActions.setEngagement(engagement);
                        ParamActions.setCommitment(commitment);
                        this.props.history.push("/");
                    }
                    else {
                        this.setState({
                            banner: <div><p className="alert alert-danger">{message}</p></div>
                        });
                    }
                })
                .catch(error => {
                    console.log(`Error: ${error}`);
                });
    }

    render() {
        return (
            <div>
                <h1>Add Parameters</h1>
                {this.state.banner}
                <div className="form-group">
                    <label>Pit</label>
                    <input type="text" className="form-control" value={this.state.pit} onChange={this.onPitChange.bind(this)} />
                    <label>Location</label>
                    <input type="text" className="form-control" value={this.state.location} onChange={this.onLocationChange.bind(this)} />
                    <label>Knowledge Base</label>
                    <input type="text" className="form-control" value={this.state.knowledgebase} onChange={this.onKnowledgeBaseChange.bind(this)} />
                    <label>Geo Risk Modelling</label>
                    <input type="text" className="form-control" value={this.state.georisk} onChange={this.onGeoRiskChange.bind(this)} />
                    <label>Preliminary Design</label>
                    <input type="text" className="form-control" value={this.state.prelimdesign} onChange={this.onPrelimDesignChange.bind(this)} />
                    <label>Engagement</label>
                    <input type="text" className="form-control" value={this.state.engagement} onChange={this.onEngagementChange.bind(this)} />
                    <label>Commitment</label>
                    <input type="text" className="form-control" value={this.state.commitment} onChange={this.onCommitmentChange.bind(this)} />
                </div>
                <button className="btn btn-success" id="submit" onClick={this.submit.bind(this)}>Add Controller</button>
            </div>
        );
    }

}

export default AddParam;