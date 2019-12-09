import {Component} from "react";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {VariantsData} from "../../../redux/reducers/variants";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import {ListGroupItem} from "reactstrap";
import * as React from "react";

interface Props extends RouteComponentProps<{}>, InjectedAuthRouterProps{
    variant: VariantsData
}

class VariantDetailed extends Component<Props> {

    private static JSONedit(json: string) {
        json = JSON.stringify(JSON.parse(json), null, 2);
        json = json.replace(/\[\n/gm, '[').replace(/\n]/gm, ']');
        json = json.replace(/},\s*{/gm, "}, {").replace(/\[ *{/gm, "[ {");
        json = json.replace(/}\s*]/gm, "} ]").replace(/ *} ]$/g, "} ]");
        return json
    }

    public render() {
        const variant = this.props.variant;
        if (!variant) {return null}
        const variantData = variant.variantData;
        return (<>
            <ListGroupItem tag={'div'} style={{whiteSpace: 'pre', fontSize: '0.8em'}} >
                {VariantDetailed.JSONedit(variantData)}
            </ListGroupItem>
            </>)
    }
}

const mapStateToProps = (state: RootState, props: any) => ({
    variant: state.variants.data
        .find(e => e.id ===
            parseInt(props.match.path.replace(/^.*\/variants\/([0-9]*?)(\/.*)?$/, "$1"), 10)
        )
});

const mapDispatchToProps = {
    getVariants: actions.getVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VariantDetailed));