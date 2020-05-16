import * as React from 'react';
import {Component} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {ModuleData, ModulesState} from "../../../redux/reducers/modules";
import AsyncWrapper from "../../containers/AsyncWrapper";
import {RouteComponentProps, withRouter} from "react-router";
import T from './MTable';
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import Button from "reactstrap/lib/Button";
import {Link} from "react-router-dom";
import {AppState} from "../../../redux/reducers/state";

interface DispatchProps {
    getModules: any;
}

interface StateToProps {
    modules: ModulesState;
    state: AppState;
}

type Props = DispatchProps & StateToProps & RouteComponentProps<{}> & InjectedAuthRouterProps;

class Modules extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
    }

    public componentDidMount() {
        this.props.getModules();
    }

    public get admin(): boolean {
        if (this.props.state.userData) {
            return this.props.state.userData.role === 'Teacher';
        }
        return false;
    }

    public onRowClick(id: number) {
        //tslint:disable
        console.log(this.props.history);
        this.props.history.push(`/module/${id}`);
    }

    public render() {
        console.log(this.props);
        return (<Container>
            <Row>
                <Col md={12}>
                    <h1>
                        Лабораторные модули
                    </h1>
                    {this.admin && <Button tag={Link} to="/upload" outline color="secondary">Загрузить новый</Button>}
                    <AsyncWrapper state={[this.props.modules]}>
                        <T
                            rows={this.props.modules.data}
                            headers={['ID', 'Название', 'Описание', 'Версия']}
                            renderer={this.renderer}
                            onRowClick={this.onRowClick}
                        />
                    </AsyncWrapper>
                </Col>
            </Row>
        </Container>);
    }

    private renderer(row: ModuleData) {
        return (
            <React.Fragment>
                <th scope="row">
                    {row.id}
                </th>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.version}</td>
            </React.Fragment>);
    }
}

const mapStateToProps = (state: RootState) => ({
    modules: state.modules,
    state: state.state,
});

const mapDispatchToProps = {
    getModules: actions.getModules,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modules));
