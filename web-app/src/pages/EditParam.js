import React, { Component } from 'react';
import axios from 'axios';

import ParamStore from "../stores/ParamStore";
import * as ParamActions from "../actions/ParamActions";
import * as env from "../env";

class EditParam extends Component {
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

    componentDidMount() {
        const pit = ParamStore.getPit();
        const location = ParamStore.getLocation();
        const knowledgebase = ParamStore.getKnowledgeBase();
        const georisk = ParamStore.getGeoRisk();
        const prelimdesign = ParamStore.getPrelimDesign();
        const engagement = ParamStore.getEngagement();
        const commitment = ParamStore.getCommitment();

        this.setState({
            pit,
            location,
            knowledgebase,
            georisk,
            prelimdesign,
            engagement,
            commitment
        });
    }

    onPitChange = (e) => {
        let pit = this.state.pit;
        pit = e.target.value.toUpperCase();
        this.setState({pit}, () => console.log(this.state.pit));
    }

    onLocationChange = (e) => {
        let location = this.state.location;
        location = e.target.value.toUpperCase();
        this.setState({location}, () => console.log(this.state.location));
    }

    onKnowledgeBaseChange = (e) => {
        let knowledgebase = [...this.state.knowledgebase];
        knowledgebase[e.target.id]["text"] = e.target.value.toUpperCase();
        knowledgebase[e.target.id]["num"] = e.target.id;
        this.setState({knowledgebase}, () => console.log(this.state.knowledgebase));
    }

    onGeoRiskChange = (e) => {
        let georisk = [...this.state.georisk];
        georisk[e.target.id]["text"] = e.target.value.toUpperCase();
        georisk[e.target.id]["num"] = e.target.id;
        this.setState({georisk}, () => console.log(this.state.georisk));
    }

    onPrelimDesignChange = (e) => {
        let prelimdesign = [...this.state.prelimdesign];
        prelimdesign[e.target.id]["text"] = e.target.value.toUpperCase();
        prelimdesign[e.target.id]["num"] = e.target.id;
        this.setState({prelimdesign}, () => console.log(this.state.prelimdesign));
    }

    onEngagementChange = (e) => {
        let engagement = [...this.state.engagement];
        engagement[e.target.id]["text"] = e.target.value.toUpperCase();
        engagement[e.target.id]["num"] = e.target.id;
        this.setState({engagement}, () => console.log(this.state.engagement));
    }

    onCommitmentChange = (e) => {
        let commitment = [...this.state.commitment];
        commitment[e.target.id]["text"] = e.target.value.toUpperCase();
        commitment[e.target.id]["num"] = e.target.id;
        this.setState({commitment}, () => console.log(this.state.commitment));
    }

    addKB = (e) => {
        this.setState((prevState) => ({
            knowledgebase: [...prevState.knowledgebase, {num:"", text:""}]
        }));
    }

    addGR = (e) => {
        this.setState((prevState) => ({
            georisk: [...prevState.georisk, {num:"", text:""}]
        }));
    }

    addPD = (e) => {
        this.setState((prevState) => ({
            prelimdesign: [...prevState.prelimdesign, {num:"", text:""}]
        }));
    }

    addEN = (e) => {
        this.setState((prevState) => ({
            engagement: [...prevState.engagement, {num:"", text:""}]
        }));
    }

    addCO = (e) => {
        this.setState((prevState) => ({
            commitment: [...prevState.commitment, {num:"", text:""}]
        }));
    }

    submit() {
        const { pit, location, knowledgebase, georisk, prelimdesign, engagement, commitment }  = this.state;
        const params = {
            pit,
            location,
            knowledgebase,
            georisk,
            prelimdesign,
            engagement,
            commitment
        };
        axios.post(`${env.API_URL}/param/edit-param`, params)
                .then(res => {
                    const { success, message} = res.data;
                    if (success) {
                        ParamActions.setPit(pit);
                        ParamActions.setLocation(location);
                        ParamActions.setKnowledgeBase(knowledgebase);
                        ParamActions.setGeoRisk(georisk);
                        ParamActions.setPrelimDesign(prelimdesign);
                        ParamActions.setEngagement(engagement);
                        ParamActions.setCommitment(commitment);
                        ParamActions.fetchParamHistory(pit,location);
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

        let {knowledgebase, georisk, prelimdesign, engagement, commitment} = this.state
        return (
            <div>
                <h1>Add Parameters</h1>
                {this.state.banner}
                <div className="form-group">
                    <label>Pit</label>
                    <input type="text" className="form-control" value={this.state.pit} onChange={this.onPitChange.bind(this)} />
                    <label>Location</label>
                    <input type="text" className="form-control" value={this.state.location} onChange={this.onLocationChange.bind(this)} />

                    <div onChange={this.onKnowledgeBaseChange}>
                        <label>Knowledge Base</label>
                        <button onClick={this.addKB}>Add Element</button>
                        {
                            knowledgebase.map((val, idx) => {
                                let kbNum = `num-${idx}`, kbText= `text-${idx}`
                                return (
                                    <div key={idx}>
                                        <label>{idx}</label>
                                        <input type="text" value={val.text} text={kbText} num={kbNum} data-id={idx} id={idx} className="form-control"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div onChange={this.onGeoRiskChange}>
                        <label>Geo Risk Modelling</label>
                        <button onClick={this.addGR}>Add Element</button>
                        {
                            georisk.map((val, idx) => {
                                let kbNum = `num-${idx}`, kbText= `text-${idx}`
                                return (
                                    <div key={idx}>
                                        <label>{idx}</label>
                                        <input type="text" value={val.text} text={kbText} num={kbNum} data-id={idx} id={idx} className="form-control"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div onChange={this.onPrelimDesignChange}>
                        <label>Prelim Design</label>
                        <button onClick={this.addPD}>Add Element</button>
                        {
                            prelimdesign.map((val, idx) => {
                                let kbNum = `num-${idx}`, kbText= `text-${idx}`
                                return (
                                    <div key={idx}>
                                        <label>{idx}</label>
                                        <input type="text" value={val.text} text={kbText} num={kbNum} data-id={idx} id={idx} className="form-control"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div onChange={this.onEngagementChange}>
                        <label>Engagement</label>
                        <button onClick={this.addEN}>Add Element</button>
                        {
                            engagement.map((val, idx) => {
                                let kbNum = `num-${idx}`, kbText= `text-${idx}`
                                return (
                                    <div key={idx}>
                                        <label>{idx}</label>
                                        <input type="text" value={val.text} text={kbText} num={kbNum} data-id={idx} id={idx} className="form-control"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div onChange={this.onCommitmentChange}>
                        <label>Commitment</label>
                        <button onClick={this.addCO}>Add Element</button>
                        {
                            commitment.map((val, idx) => {
                                let kbNum = `num-${idx}`, kbText= `text-${idx}`
                                return (
                                    <div key={idx}>
                                        <label>{idx}</label>
                                        <input type="text" value={val.text} text={kbText} num={kbNum} data-id={idx} id={idx} className="form-control"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className="btn btn-success" id="submit" onClick={this.submit.bind(this)}>Submit</button>
            </div>
        );
    }

}

export default EditParam;