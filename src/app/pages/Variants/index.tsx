import {Component, ReactNode} from "react";
import {Route, RouteComponentProps, withRouter} from "react-router";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import {Button, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
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


interface VariantsProps {
    state: AppState,
    variants: VariantsState,
    getVariants: () => void
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

class Variants extends Component<Props> {

    public componentDidMount(): void {
        if (this.props.variants.data.length === 0) {
            this.props.getVariants();
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
            <Row>
                <Col md={12}>
                    <h1>
                        Варианты
                    </h1>
                    <AsyncWrapper state={[this.props.variants]}>
                        {this.admin && <Button tag={Link} to="/variants/edit" outline color="secondary">Загрузить новый</Button>}
                        <ListGroup>
                            {this.props.variants.data.sort((e1,e2) => e1.id-e2.id).map(e => (
                                <>
                                    <ListGroupItem className={"variant"} tag={NavLink} to={location.pathname === `/variants/${e.id}` ? "/variants" : `/variants/${e.id}`}>
                                        {e.name}
                                        <Link className={"pics"} to={`/variants/${e.id}/edit`} style={{right: "40px", position: "absolute", top: "calc(50% - 19px)"}}>
                                            &#9998;
                                        </Link>
                                        <Link className={"pics"} to={"link"} style={{right: "15px", position: "absolute", top: "calc(50% - 19px)"}}>
                                            🗙
                                        </Link>
                                    </ListGroupItem>
                                    <Route path={`/variants/${e.id}`} component={VariantDetailed}/>
                                </>
                            ))}
                        </ListGroup>
                    </AsyncWrapper>
                </Col>
            </Row>
        </Container>)
    }

}

const mapStateToProps = (state: RootState) => ({
    variants: state.variants,
    state: state.state
});

const mapDispatchToProps = {
    getVariants: actions.getVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Variants));