import {Component, ReactNode} from "react";
import {Route, RouteComponentProps, withRouter} from "react-router";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import {
    Button, ButtonDropdown,
    Col,
    Container, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";
import * as React from "react";
import {NavLink, Link} from "react-router-dom";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import AsyncWrapper from "../../containers/AsyncWrapper";
import {VariantsState} from "../../../redux/reducers/variants";
import VariantDetailed from "./VariantDetailed";
import './Variants.css';
import {AppState} from "../../../redux/reducers/state";
import {ModuleData} from "../../../redux/reducers/modules";


interface VariantsProps {
    state: AppState,
    variants: VariantsState,
    getVariants: (moduleId?: number) => void,
    getModules: () => void,
    modules: ModuleData[]
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

interface State {
    filter?: number,
    isDropdownOpen: boolean
}

class Variants extends Component<Props, State> {

    public state = {
        filter: undefined,
        isDropdownOpen: false,
        currentDropdownOption: undefined
    };

    constructor(props: Props) {
        super(props);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    public componentDidMount(): void {
        if (this.props.variants.data.length === 0) {
            this.props.getVariants();
            this.props.getModules();
        }
    }

    public componentDidUpdate(oldProps: Props, oldState: State): void {
        if (oldState.filter !== this.state.filter) {
            this.props.getVariants(this.state.filter)
        }
    }

    public get admin(): boolean {
        if (this.props.state.userData) {
            return this.props.state.userData.role === 'Teacher';
        }
        return false;
    }

    public render(): ReactNode {
        return (<Container>
            <AsyncWrapper state={[this.props.variants]}>
                <Row>
                    <Col md={{
                        size: 8,
                        offset: 1
                    }}
                         style={{marginLeft: "0"}}>
                        <h1>
                            Варианты
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={{
                        size: 6,
                    }}>
                        {this.admin &&
                        <Button tag={Link} to="/variants/edit" outline color="secondary">Создать новый</Button>}
                    </Col>
                    <Col md={{
                        size: 6
                    }}
                         style={{textAlign: "right"}}>
                        <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.handleDropdownToggle}
                                        outline color="secondary" style={{marginRight: "0"}}>
                            <DropdownToggle outline color="secondary" className={"generate"} caret>
                                {(this.props.modules.find(m => m.id === this.state.filter) || {name: "Все"}).name}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={this.handleDropdownClick(undefined)}
                                >
                                    Все
                                </DropdownItem>
                                {this.props.modules.map(m =>
                                    <DropdownItem
                                        key={m.id}
                                        onClick={this.handleDropdownClick(m.id)}
                                    >
                                        {m.name}
                                    </DropdownItem>)}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {this.props.variants.data.map(e => (
                                <>
                                    <ListGroupItem className={"variant"} tag={NavLink}
                                                   to={location.pathname === `/variants/${e.id}` ? "/variants" : `/variants/${e.id}`}>
                                        {e.name}
                                        <Link className={"pics"} to={`/variants/${e.id}/edit`}
                                              style={{right: "40px", position: "absolute", top: "calc(50% - 19px)"}}>
                                            &#9998;
                                        </Link>
                                        <Link className={"pics"} to={"link"}
                                              style={{right: "15px", position: "absolute", top: "calc(50% - 19px)"}}>
                                            🗙
                                        </Link>
                                    </ListGroupItem>
                                    <Route path={`/variants/${e.id}`} component={VariantDetailed}/>
                                </>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </AsyncWrapper>
        </Container>)
    }

    private handleDropdownToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    private handleDropdownClick(id?: number) {
        return () => {
            this.setState({
                filter: id
            })

        }
    }

}

const mapStateToProps = (state: RootState) => ({
    variants: {
        ...state.variants,
        data: state.variants.data.sort((e1, e2) => e1.id - e2.id)
    },
    modules: state.modules.data,
    state: state.state
});

const mapDispatchToProps = {
    getVariants: actions.getVariants,
    getModules: actions.getModules
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Variants));