import * as React from 'react';
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import AsyncWrapper from "../../containers/AsyncWrapper";
import {ResultData, ResultsState} from "../../../redux/reducers/results";
import T from './RTable';
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";
import {AppState} from "../../../redux/reducers/state";

interface DispatchProps {
    getResults: any;
}

interface StateToProps {
    results: ResultsState;
    state: AppState;
}

type Props = DispatchProps & StateToProps & InjectedAuthRouterProps;

interface State {
    modal: boolean;
}

class Results extends Component<Props, State> {
    public state = {
      modal: false,
    };

    public constructor(props: Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.confirm = this.confirm.bind(this);
        this.decline = this.decline.bind(this);
    }

    public get admin(): boolean {
        if (this.props.state.userData) {
            return this.props.state.userData.role === 'Teacher';
        }
        return false;
    }

    public get headers(): string[] {
        const arr = ['ID', 'Действие', 'Вариант'];
        if (this.admin) {
            arr.push('Студент');
        }
        return arr;
    }

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
                    <Button outline color="secondary" onClick={this.toggle}>Фильтр</Button>
                    <AsyncWrapper state={[this.props.results]}>
                        <T
                            headers={this.headers}
                            rows={this.props.results.data}
                            renderer={this.renderer}
                        />
                    </AsyncWrapper>
                </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Фильтр результатов</ModalHeader>
                <ModalBody>
                    asdasd
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.confirm}>Применить фильтр</Button>{' '}
                    <Button color="secondary" onClick={this.decline}>Сбросить фильтр</Button>
                </ModalFooter>
            </Modal>
        </Container>);
    }

    private toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    private confirm() {
        this.toggle();
    }

    private decline() {
        this.toggle();
    }

    private renderer(row: ResultData) {
        return (
            <React.Fragment>
                <th scope="row">
                    {row.id}
                </th>
                <td>{row.action}</td>
                <td>{row.variantId}</td>
                {this.admin && <td>{row.studentId}</td>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    results: state.results,
    state: state.state,
});

const mapDispatchToProps = {
    getResults: actions.getResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
