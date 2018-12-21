import * as React from 'react';
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import AsyncWrapper from "../../containers/AsyncWrapper";
import {ResultData, ResultsState} from "../../../redux/reducers/results";
import T from './RTable';

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
                        <T
                            headers={['ID', 'Действие', 'Вариант']}
                            rows={this.props.results.data}
                            renderer={this.renderer}
                        />
                    </AsyncWrapper>
                </Col>
            </Row>
        </Container>);
    }

    private renderer(row: ResultData) {
        return (
            <React.Fragment>
                <th scope="row">
                    {row.id}
                </th>
                <td>{row.action}</td>
                <td>{row.variantId}</td>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    results: state.results,
});

const mapDispatchToProps = {
    getResults: actions.getResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
