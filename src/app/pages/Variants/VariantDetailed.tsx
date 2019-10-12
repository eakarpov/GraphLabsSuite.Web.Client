import {Component} from "react";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {VariantsState} from "../../../redux/reducers/variants";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import {ListGroupItem} from "reactstrap";
import * as React from "react";

interface Props extends RouteComponentProps<{}>, InjectedAuthRouterProps{
    variants: VariantsState
}

class VariantDetailed extends Component<Props> {
    public render() {
        const variant = this.props.variants.data
            .find(e => e.id ===
                parseInt(this.props.match.path.replace(/^.*\/variants\/([0-9]*?)(\/.*)?$/, "$1"), 10)
            );
        if (!variant) {return null};
        const variantData = variant.variantData;
        return (
            <ListGroupItem tag={'div'}>
                {variantData}
            </ListGroupItem>);
    }
}

const mapStateToProps = (state: RootState) => ({
    variants: state.variants
});

const mapDispatchToProps = {
    getVariants: actions.getVariants,
    getModules: actions.getModules
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VariantDetailed));