import * as React from 'react';
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {Subject, TestState} from "../../../redux/reducers/test";
import AsyncWrapper from "../../containers/AsyncWrapper";
// import {RouteComponentProps, withRouter} from "react-router";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import T from './TTable';
import {AppState} from "../../../redux/reducers/state";

interface DispatchProps {
    getSubjects: any;
}

interface StateToProps {
    test: TestState;
    state: AppState;
}

type Props = DispatchProps & StateToProps & InjectedAuthRouterProps;
class Test extends Component<Props> {

  constructor(props: Props) {
      super(props);
  }

  public render() {
    // console.log(this.props);

    return (<Container>
        <Row>
            <Col md={12}>
                <h1>
                    Темы
                </h1>
                <AsyncWrapper state={[this.props.test]}>
                    <T
                        rows={this.props.test.data}
                        headers={['ID', 'Название', 'Описание']}
                        renderer={this.renderer}
                    />
                </AsyncWrapper>
            </Col>
        </Row>
    </Container>);
  }

  private renderer(row: Subject) {
      return (
          <React.Fragment>
              <th scope="row">
                  {row.id}
              </th>
              <td>{row.name}</td>
              <td>{row.description}</td>
          </React.Fragment>);
  }
}

const mapStateToProps = (state: RootState) => ({
    test: state.test,
    state: state.state,
});

const mapDispatchToProps = {
    getSubjects: actions.getSubjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
