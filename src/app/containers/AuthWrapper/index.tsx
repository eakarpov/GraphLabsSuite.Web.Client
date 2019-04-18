import {Component, ReactNode} from 'react';
import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from '../../../redux/rootReducer';
import {actions} from '../../../redux/actions';

export interface DispatchProps {
    getMe: () => void;
}

export type AuthProps = DispatchProps;

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


const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = {
    getMe: actions.getMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
