import * as React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand } from 'reactstrap';
import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {mainListItems} from "../../menus/MainMenu";
import './style.css';
import * as logo from '../../../resources/logo.png';
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {AppState} from "../../../redux/reducers/state";
import {actions} from "../../../redux/actions";

interface Props extends RouteComponentProps<{}> {
    state: AppState;
    setLogged: (val: boolean) => void;
}

interface State {
    isOpen: boolean;
}

class GNavbar extends Component<Props, State> {
    public state = {
        isOpen: false
    };
    constructor(props: Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }
    public logout() {
        localStorage.removeItem('gl-token');
        this.props.setLogged(false);
        this.props.history.push('/');
    }
    public render() {
        return (
            <div>
                <Navbar expand="md" className="header">
                    <NavbarBrand href="/"><img src={logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {mainListItems(this.props.state.logged, this.logout)}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
    private toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect((state: RootState) => ({
    state: state.state,
}), {
    setLogged: actions.setLogged,
})(withRouter(GNavbar));