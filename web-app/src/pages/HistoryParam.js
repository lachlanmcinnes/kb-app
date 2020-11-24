import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ParamStore from "../stores/ParamStore";
import UserStore from "../stores/UserStore";

import Param from "../models/param";

class HistoryParams extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: ParamStore.getHistory(),
            banner: <div></div>
        }
        this.bannerTimeout = null;
    }

    componentDidMount() {
        const history = ParamStore.getHistory();

        console.log(history);

        this.setState({
            history
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

        let { history } = this.state;

        var renderHistory = history.map((val, idx) => {

            let controls = `collapse-${idx}`;
            let target = `#collapse-${idx}`

            return(

                <div>
                    <p>
                        <button class="btn btn-primary" type="button" data-toggle="collapse" data-target={target} aria-expanded="false" aria-controls={controls}> Show #{idx}</button>
                    </p>
                    <div class="collapse" id={controls}>
                        <div class="card card-body">
                            <label>KNOWLEDGE BASE</label>
                            <table className="box" cellPadding="5">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Text</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        val.knowledgebase.length > 0
                                        ?
                                            val.knowledgebase.map(j => {
                                                return (
                                                    <tr>
                                                        <td>{j.num}</td>
                                                        <td>{j.text}</td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                {
                    UserStore.getUserId() === ''
                        ? <Redirect to={{ pathname: "/login" }} />
                        : <div>
                            {this.state.banner}
                            <h1>History</h1>
                            {
                                history.length > 0
                                    ? 
                                        <div>
                                            {renderHistory}
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

export default HistoryParams;