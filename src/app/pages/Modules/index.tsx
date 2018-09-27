import * as React from 'react';
import {Component} from "react";
import GTable from "../../containers/Table";
import {Col, Container, Row} from "reactstrap";

class Modules extends Component {
  public render() {
    return (<Container>
        <Row>
          <Col md={12}>
            <h1>
              Лабораторные модули
            </h1>
            <GTable rows={[]}/>
          </Col>
        </Row>
    </Container>);
  }
}

export default Modules;
