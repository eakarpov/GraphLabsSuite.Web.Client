import * as React from 'react';
import {Route, Switch} from "react-router";
import Modules from "../pages/Modules";
import Module from "../pages/Module";

const Routes = () => (
    <Switch>
        <Route path="/" exact component={/* tslint:disable-line */() => null} />
        <Route path="/modules" component={Modules}/>
        <Route path="/module/:moduleId" component={Module}/>
    </Switch>
);

export default Routes;