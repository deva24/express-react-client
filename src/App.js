import React from "react";
import {BrowserRouter as Router, Redirect, Link, Switch, Route} from "react-router-dom"

function k()
{
    return <Router>
        Hello world
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
            <Route path='/' exact><Redirect to='/home'/></Route>
            <Route path='/home' exact>Home</Route>
            <Route path="/about">About</Route>
        </Switch>
    </Router>
}
export default k;