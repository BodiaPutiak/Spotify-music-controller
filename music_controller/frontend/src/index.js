import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Routes, Route, Link, Redirect } from "react-router-dom";


ReactDOM.render(
    // <div className="container">
        <React.StrictMode>
            <Router >
                <App />
            </Router>
        </React.StrictMode>,
    // </div>,
    document.getElementById('app')
);