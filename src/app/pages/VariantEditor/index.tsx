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
import {
    Button,
    ButtonDropdown,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Row
} from "reactstrap";
import './VariantEditor.css';

interface VariantsProps {
    variant: VariantData,
    getVariants: () => void
}

interface State {
    vertexAmount: number,
    edgesAmount: number,
    value: string,
    isDropdownOpen: boolean
    labels: {
        label1: string,
        label2: string,
        structButton: string
    },
    structToGenerate: string,
    currentDropdownOption: string
}

type Props = VariantsProps & RouteComponentProps<{}> & InjectedAuthRouterProps

class VariantEditor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isDropdownOpen: false,
            currentDropdownOption: "Граф с обозначением вершин",
            vertexAmount: 5,
            edgesAmount: 6,
            value: "Здесь еще ничего нет",
            labels: {
                label1: "Количество вершин",
                label2: "Количество ребер",
                structButton: "Генерировать структуру графа"
            },
            structToGenerate: "graphV"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateVertex = this.updateVertex.bind(this);
        this.updateEdge = this.updateEdge.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.getOptionHandler = this.getOptionHandler.bind(this);
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
        return <Container style={{marginTop: "50px"}}>
            <Row>
                <Col xs={9}>
                    <AceEditor
                        mode="json"
                        theme="github"
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="UNIQUE_ID_OF_DIV"
                        width={"100%"}
                    />
                </Col>
                <Col xs={3}>
                    <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.handleDropdownToggle}>
                        <DropdownToggle caret>
                            {this.state.currentDropdownOption}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.getOptionHandler({
                                label1: "Количество вершин",
                                label2: "Количество ребер",
                                structButton: "Генерировать структуру графа"
                            }, "graphV", "Граф с обозначением вершин") }>Граф с обозначением вершин</DropdownItem>
                            <DropdownItem onClick={this.getOptionHandler({
                                label1: "Количество вершин",
                                label2: "Количество ребер",
                                structButton: "Генерировать структуру графа"
                            }, "graphVE", "Граф с обозначением и вершин, и ребер")}>Граф с обозначением и вершин, и ребер</DropdownItem>
                            <DropdownItem onClick={this.getOptionHandler({
                                label1: "Количество строк",
                                label2: "Количество столбцов",
                                structButton: "Генерировать структуру матрицы"
                            }, "matrix", "Матрица")}>Матрица</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    <div>
                        <a>{this.state.labels.label1}</a>
                        <Input width={"50%"} type={"number"} defaultValue="5" onChange={this.updateVertex}>Количество
                            вершин</Input>
                        <a>{this.state.labels.label2}</a>
                        <Input width={"50%"} type={"number"} defaultValue="6" onChange={this.updateEdge}>Количество
                            ребер</Input>
                        <Button onClick={this.handleButtonClick}>{this.state.labels.structButton}</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }

    private getOptionHandler(labels: State['labels'], structToGenerate: State['structToGenerate'], currentDropdownOption: string) {
        return (() => {
            this.setState({
                labels,
                structToGenerate,
                currentDropdownOption
            })
        })
    }

    private handleDropdownToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    private handleButtonClick() {
        window['console'].log(this.state)
        switch(this.state.structToGenerate) {
            case "graphV": {
                let vertices = "";
                let edges;
                this.state.edgesAmount > 0 ? edges = "{ \"source\": , \"target\": }," : edges = "";
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
                break;
            }
            case "graphVE": {
                let vertices = "";
                let edges;
                this.state.edgesAmount > 0 ? edges = "{ \"name\": 1, \"source\": , \"target\": }," : edges = "";
                for (let i = 1; i < this.state.vertexAmount; i++) {
                    vertices = vertices + '\"' + i.toString() + '\", '
                }
                for (let i = 1; i < this.state.edgesAmount; i++) {
                    edges = edges + "\n         { \"name\": " + (i+1).toString() + ", \"source\": , \"target\": },"
                }
                vertices = vertices + '\"' + this.state.vertexAmount + '\", '
                const graphStructure = "[{ \"type\": \"graph\", \"value\": \n" +
                    "   { \"vertices\": [" + vertices + "], \n" +
                    "   \"edges\": \n" +
                    "       [ " + edges + " ] \n" +
                    "   } \n" +
                    "} ] \n"
                this.handleChange(graphStructure);
                break;
            }
            case "matrix": {
                this.handleChange("matrix")
                break;
            }
            default: {
                this.handleChange("Здесь еще ничего нет")
                break;
            }
        }

    }

    private updateVertex(event: any) {
        this.setState({
            vertexAmount: event.target.value
        })
    }

    private updateEdge(event: any) {
        this.setState({
            edgesAmount: event.target.value
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