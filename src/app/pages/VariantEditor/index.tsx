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
import {Button, Input} from "reactstrap";

interface VariantsProps {
    variant: VariantData,
    getVariants: () => void
}

interface State {
    value: string
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

class VariantEditor extends Component<Props, State> {

    private ref1: React.RefObject<Input>;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: "Здесь еще ничего нет"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.ref1 = React.createRef();
    }

    public componentDidMount() {
        this.props.getVariants();
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.variant) {
            if ((prevProps.variant || {} as any).variantData !== this.props.variant.variantData) {
                this.setState({
                    value: this.props.variant.variantData
                })
            }
        }
    }

    public render(): ReactNode {
        return <>
            <AceEditor
                mode="json"
                theme="github"
                value={this.state.value}
                onChange={this.handleChange}
                name="UNIQUE_ID_OF_DIV"
            />
            <Input ref={this.ref1}>Количество вершин</Input>
            <Input>Количество ребер</Input>
            <Button onClick={this.handleButtonClick}>Генерировать структуру графа</Button>
        </>
    }

    private handleButtonClick() {
        window['console'].log(this.ref1.current);
        const graphStructure = "[{ \"type\": \"graph\", \"value\": \n" +
            "   { \"vertices\": [ ], \n" +
            "   \"edges\": \n" +
            "       [ { \"source\": , \"target\": },\n" +
            "         { \"source\": , \"target\": },\n" +
            "         { \"source\": , \"target\": },\n" +
            "         { \"source\": , \"target\": }, \n" +
            "         { \"source\": , \"target\": } ] \n" +
            "   } \n" +
            "} ] \n";
        this.handleChange(graphStructure);
    }

    private handleChange(value: string) {
        this.setState({
            value
        })
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