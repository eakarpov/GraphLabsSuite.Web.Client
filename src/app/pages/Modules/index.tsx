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

interface DispatchProps {
    getModules: any;
}

interface StateToProps {
    modules: ModulesState;
}

type Props = DispatchProps & StateToProps & RouteComponentProps<{}>;

class Modules extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
    }

    public componentDidMount() {
        this.props.getModules();
    }

    public onRowClick(id: number) {
        this.props.history.push(`/module/${id}`);
    }

    public render() {
        return (<Container>
            <Row>
                <Col md={12}>
                    <h1>
                        Лабораторные модули
                    </h1>
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
});

const mapDispatchToProps = {
    getModules: actions.getModules,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modules));
