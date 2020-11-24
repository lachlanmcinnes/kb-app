import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ParamStore from "../stores/ParamStore";
import UserStore from "../stores/UserStore";

import Param from "../models/param";

class Params extends Component {
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
        this.bannerTimeout = null;
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

    setBanner(banner) {
        if (this.bannerTimeout) {
            clearTimeout(this.bannerTimeout);
        }
        this.setState({ banner });
        this.bannerTimeout = setTimeout(() => {this.setState({banner: <div></div>})}, 5000)
    }

    render() {

        let {pit, location, knowledgebase, georisk, prelimdesign, engagement,commitment} = this.state;

        var renderKnowledge = knowledgebase.map(i => 
            <tr>
                <td>{i.num}</td>
                <td>{i.text}</td>
            </tr>
        )

        var renderGeoRisk = georisk.map(i => 
            <tr>
                <td>{i.num}</td>
                <td>{i.text}</td>
            </tr>
        )

        var renderPrelimDesign = prelimdesign.map(i => 
            <tr>
                <td>{i.num}</td>
                <td>{i.text}</td>
            </tr>
        )

        var renderEngagement = engagement.map(i => 
            <tr>
                <td>{i.num}</td>
                <td>{i.text}</td>
            </tr>
        )

        var renderCommitment = commitment.map(i => 
            <tr>
                <td>{i.num}</td>
                <td>{i.text}</td>
            </tr>
        )

        return (
            <div>
                {
                    UserStore.getUserId() === ''
                        ? <Redirect to={{ pathname: "/login" }} />
                        : <div>
                            {this.state.banner}
                            <h1>Parameters</h1>
                            {
                                pit != ''
                                    ? 
                                        <div>
                                            <div>
                                                <label>PIT: {pit}</label>
                                            </div>
                                            <div>
                                                <label>LOCATION: {location}</label>
                                            </div>
                                            <div>
                                                <label>KNOWLEDGE BASE</label>
                                                <table className="box" cellPadding="5">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {renderKnowledge}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <label>GEO RISK</label>
                                                <table className="box" cellPadding="5">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {renderGeoRisk}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <label>PRELIM DESIGN</label>
                                                <table className="box" cellPadding="5">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {renderPrelimDesign}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <label>ENGAGEMENT</label>
                                                <table className="box" cellPadding="5">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {renderEngagement}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <label>COMMITMENT</label>
                                                <table className="box" cellPadding="5">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Text</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {renderCommitment}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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