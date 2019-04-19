import {Component, ReactNode} from 'react';
import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../../redux/rootReducer';
import {actions} from '../../../redux/actions';
import {RouteComponentProps, withRouter} from "react-router";

export interface DispatchProps {
    getMe: () => void;
}

export type AuthProps = DispatchProps & RouteComponentProps<{}>;

class AuthWrapper extends Component<AuthProps> {
    public componentDidMount() {
        this.props.getMe();
    }
    public render(): ReactNode {
        return (<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {this.props.children}
        </div>)
    }
}


const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
    getMe: actions.getMe,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthWrapper));
