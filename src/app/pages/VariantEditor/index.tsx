import {Component, ReactNode} from "react";
import * as React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import {RouteComponentProps, withRouter} from "react-router";
import {InjectedAuthRouterProps} from "redux-auth-wrapper/history3/redirect";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
import {connect} from "react-redux";
import 'jsoneditor/dist/jsoneditor.min.css';
import {VariantData} from "../../../redux/reducers/results";

interface VariantsProps {
    variant: VariantData,
    getVariants: () => void
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

class VariantEditor extends Component<Props> {

    public componentDidMount() {
        this.props.getVariants();
    }

    public render(): ReactNode {
        if (!this.props.variant) {
        return <AceEditor
            mode="json"
            theme="github"
            defaultValue={"Здесь еще ничего нет"}
            name="UNIQUE_ID_OF_DIV"
        />
        }
        return <AceEditor
            mode="json"
            theme="github"
            defaultValue={this.props.variant.variantData}
            name="UNIQUE_ID_OF_DIV"
        />
    }

}

const mapStateToProps = (state: RootState, props: any) => {
    return {
        variant: (state.variants.data || []).find(e => e.id === parseInt(props.match.params.id, 10))
    };
};

const mapDispatchToProps = {
    getVariants: actions.getVariants,
    getModules: actions.getModules
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VariantEditor));