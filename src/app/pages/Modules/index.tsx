import * as React from 'react';
import {Component} from "react";
import GTable from "../../containers/Table";
import Typography from "@material-ui/core/Typography";

class Modules extends Component {
  public render() {
    return (<div>
      <Typography variant="headline" color="inherit" noWrap>
        Лабораторные модули
      </Typography>
      <GTable rows={[]}/>
    </div>);
  }
}

export default Modules;
