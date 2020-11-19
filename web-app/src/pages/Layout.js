import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import CurrentParam from "../pages/CurrentParam";
//import HistoryParam from "../pages/HistoryParam";
import AddParam from "../pages/AddParam";
import EditParam from "../pages/EditParam";
//import AddCheck from "../pages/AddCheck";

// Components
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

class Layout extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation history={Router.history} />
                    <div className="container">
                        <Route exact path="/" component={CurrentParam} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/add-param" component={AddParam} />
                        <Route path="/edit-param" component={EditParam} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Layout;