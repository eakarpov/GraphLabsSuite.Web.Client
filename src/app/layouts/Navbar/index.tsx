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

interface Props extends RouteComponentProps<{}> {

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
    }
    public render() {
        return (
            <div>
                <Navbar expand="md" className="header">
                    <NavbarBrand href="/"><img src={logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {mainListItems}
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

export default withRouter(GNavbar);