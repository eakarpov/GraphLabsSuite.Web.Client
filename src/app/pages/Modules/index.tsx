import * as React from 'react';
import {Component} from "react";
import GTable from "../../containers/Table";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {ModulesState} from "../../../redux/reducers/modules";
import AsyncWrapper from "../../containers/AsyncWrapper";

interface DispatchProps {
    getModules: any;
}

interface StateToProps {
  modules: ModulesState;
}

type Props = DispatchProps & StateToProps;

class Modules extends Component<Props> {
  public componentDidMount() {
    this.props.getModules();
  }
  public render() {
    return (<Container>
        <Row>
          <Col md={12}>
            <h1>
              Лабораторные модули
            </h1>
              <AsyncWrapper state={[this.props.modules]}>
                <GTable rows={this.props.modules.data}/>
              </AsyncWrapper>
          </Col>
        </Row>
    </Container>);
  }
}

const mapStateToProps = (state: RootState) => ({
   modules: state.modules,
});

const mapDispatchToProps = {
  getModules: actions.getModules,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
