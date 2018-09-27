import * as React from 'react';
import {Route, Switch} from "react-router";
import Modules from "../pages/Modules";

const Routes = () => (
    <Switch>
        <Route path="/" exact component={/* tslint:disable-line */() => null} />
        <Route path="/modules" component={Modules}/>
    </Switch>
);

export default Routes;