import React, { Fragment } from "react";
import { BrowserRouter as Router,  Switch } from "react-router-dom";

import { ProtectedRoute } from "./protected.routes";
import { PublicRoute } from "./public.routes";

import Loading from "./Utilities/Loading";
import ApplicationError from "./Utilities/ApplicationError";
import ServerError from "./Utilities/ServerError";

import Login from "./Auth/Login";
import Tasks from "./Tasks";

//------ Route Definitions ------
// eslint-disable-next-line no-unused-vars

export const RoutedContent = () => {
    return (
        <Fragment>
            <Loading></Loading>
            {/* UI - show applecation error page  */}
            <ApplicationError></ApplicationError>
            {/* UI - show server error page  */}
            <ServerError></ServerError>
            <Router>
                <Switch>
                    <ProtectedRoute exact path="/tasks" component={Tasks} />
                    <PublicRoute path="/login" component={Login} />
                    <PublicRoute path="/" component={Login} />
                </Switch>
            </Router>
        </Fragment>
    );
};
