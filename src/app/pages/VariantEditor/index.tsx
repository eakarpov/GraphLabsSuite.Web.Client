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
    vertexAmount: number,
    edgesAmount: number,
    value: string,
    options: string[]
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

class VariantEditor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            vertexAmount: 5,
            edgesAmount: 6,
            value: "Здесь еще ничего нет",
            options: ["граф", "ориентированный граф", "матрица"]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateVertex = this.updateVertex.bind(this)
        this.updateEdge = this.updateEdge.bind(this)
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
                width={"70%"}
            />
            <a>Количество вершин</a>
            <Input width={"50%"} type={"number"} defaultValue="5" onChange={this.updateVertex}>Количество вершин</Input>
            <a>Количество ребер</a>
            <Input width={"50%"} type={"number"} defaultValue="6" onChange={this.updateEdge}>Количество ребер</Input>
            <Button onClick={this.handleButtonClick}>Генерировать структуру графа</Button>
        </>
    }

    private handleButtonClick() {
        window['console'].log(this.state)
        let vertices = "";
        let edges;
        this.state.edgesAmount>0 ? edges = "{ \"source\": , \"target\": }," : edges = "";
        for (let i = 1; i < this.state.vertexAmount; i++) {
            vertices = vertices + '\"' + i.toString() + '\", '
        }
        for (let i = 1; i < this.state.edgesAmount; i++) {
            edges = edges + "\n         { \"source\": , \"target\": },"
        }
        vertices = vertices + '\"' + this.state.vertexAmount + '\", '
        const graphStructure = "[{ \"type\": \"graph\", \"value\": \n" +
            "   { \"vertices\": [" + vertices + "], \n" +
            "   \"edges\": \n" +
            "       [ " + edges + " ] \n" +
            "   } \n" +
            "} ] \n"
        this.handleChange(graphStructure);
    }

    private updateVertex(event: any) {
        this.setState({
            vertexAmount : event.target.value
        })
    }

    private updateEdge(event: any) {
        this.setState({
            edgesAmount : event.target.value
        })
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
    getVariants: actions.getVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VariantEditor));