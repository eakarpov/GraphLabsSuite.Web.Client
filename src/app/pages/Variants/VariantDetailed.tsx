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

    public JSONedit(json: string) {
        json = JSON.stringify(JSON.parse(json), null, 2);
        json = json.replace('[\n', '[').replace('\n]', ']');
        json = json.replace('{\n', '{').replace('\n}', '}');
        let fvIndex = json.indexOf('vertices')
        let verticesPart = json.substring(fvIndex)
        const svIndex = verticesPart.indexOf(']')+1+fvIndex
        fvIndex = verticesPart.indexOf('[')+fvIndex
        verticesPart = json.substring(fvIndex,svIndex).split('\n').join('').split(' ').join('').split(',').join(', ');
        json = json.substr(0,fvIndex) + verticesPart + json.substr(svIndex)
        return json
    }

    public render() {
        const variant = this.props.variants.data
            .find(e => e.id ===
                parseInt(this.props.match.path.replace(/^.*\/variants\/([0-9]*?)(\/.*)?$/, "$1"), 10)
            );
        if (!variant) {return null}
        const variantData = variant.variantData;
        return (<>
            <ListGroupItem tag={'div'} style={{whiteSpace: 'pre', fontSize: '0.8em'}} >
                {this.JSONedit(JSON.stringify(JSON.parse(variantData)))}
            </ListGroupItem>
            </>)
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