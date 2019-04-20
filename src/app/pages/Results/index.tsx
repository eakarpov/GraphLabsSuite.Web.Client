import * as React from 'react';
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {ResultData, ResultsState} from "../../../redux/reducers/results";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";
import {AppState} from "../../../redux/reducers/state";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import P from './RPage';

interface DispatchProps {
    getResults: any;
}

interface StateToProps {
    results: ResultsState;
    state: AppState;
}

interface ResultFilter {
    variant: string;
    module: string;
    student?: string;
    action: string;
}

type Props = DispatchProps & StateToProps & InjectedAuthRouterProps;

interface State {
    modal: boolean;
    filter: Partial<ResultFilter>,
}

class Results extends Component<Props, State> {
    public state = {
      modal: false,
      filter: {}
    };

    public variant!: HTMLInputElement;
    public module!: HTMLInputElement;
    public student!: HTMLInputElement;
    public action!: HTMLInputElement;

    public constructor(props: Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.confirm = this.confirm.bind(this);
        this.decline = this.decline.bind(this);
        this.renderer = this.renderer.bind(this);
        this.setStudent = this.setStudent.bind(this);
        this.setAction = this.setAction.bind(this);
        this.setModule = this.setModule.bind(this);
        this.setVariant = this.setVariant.bind(this);
    }

    public get admin(): boolean {
        if (this.props.state.userData) {
            return this.props.state.userData.role === 'Teacher';
        }
        return false;
    }

    public get headers(): string[] {
        const arr = ['ID', 'Действие', 'Вариант', 'Модуль', 'Время'];
        if (this.admin) {
            arr.push('Студент');
        }
        return arr;
    }

    public render() {
        const mapper: any = {};
        mapper['ID'] = 'id';
        mapper['Действие'] = 'action';
        mapper['Вариант'] = 'variantId';
        mapper['Студент'] = 'studentId';
        mapper['Модуль'] = 'variant.taskModule.id';
        mapper['Время'] = 'dateTime';
        return (<Container>
            <Row>
                <Col md={12}>
                    <h1>
                        Результаты
                    </h1>
                    <Button outline color="secondary" onClick={this.toggle}>Фильтр</Button>
                    <P
                        headers={this.headers}
                        data={this.props.results}
                        renderer={this.renderer}
                        request={this.props.getResults}
                        filter={this.state.filter}
                        mapper={mapper}
                    />
                </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Фильтр результатов</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="action">Действие</Label>
                            <Input innerRef={this.setAction} name="action" id="action" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="variant">Вариант</Label>
                            <Input innerRef={this.setVariant} name="variant" id="variant" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="module">Название модуля</Label>
                            <Input innerRef={this.setModule} name="module" id="module" />
                        </FormGroup>
                        {this.admin && <FormGroup>
                            <Label for="student">E-mail студента</Label>
                            <Input innerRef={this.setStudent} name="student" id="student" />
                        </FormGroup>}
                    </Form>
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
        this.setState({
          filter: {
              variant: this.variant.value,
              student: this.student && this.student.value,
              module: this.module.value,
              action: this.action.value,
          },
        });
        this.toggle();
    }

    private decline() {
        this.toggle();
    }

    private renderer(row: ResultData) {
        const date = new Date(row.dateTime);
        return (
            <React.Fragment>
                <th scope="row">
                    {row.id}
                </th>
                <td>{row.action}</td>
                <td>{row.variant.name}</td>
                <td>{row.variant.taskModule.name}</td>
                <td>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
                {this.admin && <td>{row.student.email}</td>}
            </React.Fragment>
        );
    }

    private setVariant(i: HTMLInputElement) {
        this.variant = i;
    }

    private setStudent(i: HTMLInputElement) {
        this.student = i;
    }

    private setAction(i: HTMLInputElement) {
        this.action = i;
    }

    private setModule(i: HTMLInputElement) {
        this.module = i;
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
