import * as React from 'react';
import {Component} from "react";
import GTable from "../../containers/Table";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import AsyncWrapper from "../../containers/AsyncWrapper";
import {ResultsState} from "../../../redux/reducers/results";

interface DispatchProps {
    getResults: any;
}

interface StateToProps {
    results: ResultsState;
}

type Props = DispatchProps & StateToProps;

class Results extends Component<Props> {
    public componentDidMount() {
        this.props.getResults();
    }
    public render() {
        return (<Container>
            <Row>
                <Col md={12}>
                    <h1>
                        Результаты
                    </h1>
                    <AsyncWrapper state={[this.props.results]}>
                        <GTable rows={this.props.results.data}/>
                    </AsyncWrapper>
                </Col>
            </Row>
        </Container>);
    }
}

const mapStateToProps = (state: RootState) => ({
    results: state.results,
});

const mapDispatchToProps = {
    getResults: actions.getResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
