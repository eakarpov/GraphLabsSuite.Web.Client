import * as React from 'react';
import {Route, Switch} from "react-router";
import Modules from "../pages/Modules";
import Module from "../pages/Module";
import Home from "../pages/Home";

const Routes = () => (
    <div style={{ minHeight: 'calc(100vh - 56px - 23px)', height: 'calc(100vh - 56px - 23px)' }}>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/modules" component={Modules}/>
            <Route path="/module/:moduleId" component={Module}/>
        </Switch>
    </div>
);

export default Routes;