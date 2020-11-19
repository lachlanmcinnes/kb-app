import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

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
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default Layout;