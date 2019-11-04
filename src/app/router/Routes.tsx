import * as React from 'react';
import {Route, Switch} from "react-router";
import Modules from "../pages/Modules";
import Module from "../pages/Module";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Results from "../pages/Results";
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import {RootState} from "../../redux/rootReducer";
import Upload from '../pages/Upload';
import Variants from "../pages/Variants";
import VariantEditor from "../pages/VariantEditor";

// tslint:disable

const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/auth',
    // If selector is true, wrapper will not redirect
    // For example let's check that state contains user data
    authenticatedSelector: (state: RootState) => state.state.logged,
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated'
});

const Routes = () => (
    <div style={{ flexGrow: 1 }}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Login}/>
            <Route path="/results" exact component={userIsAuthenticated(Results)} />
            <Route path="/modules" component={userIsAuthenticated(Modules)}/>
            <Route path="/module/:moduleId" component={userIsAuthenticated(Module)}/>
            <Route path="/upload" component={userIsAuthenticated(Upload)} />
            <Switch>
                <Route path="/variants/:id/edit" exact component={VariantEditor} />
                <Route path="/variants/edit" exact component={VariantEditor} />
                <Route path="/variants" component={userIsAuthenticated(Variants)} />
            </Switch>
        </Switch>
    </div>
);

export default Routes;