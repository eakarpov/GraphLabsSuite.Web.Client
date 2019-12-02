import * as React from "react";
import {Component, ReactNode} from "react";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
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
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
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
    currentDropdownOption: string,
    tabIndex: string
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
            structToGenerate: "graphV",
            tabIndex: "1"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateVertex = this.updateVertex.bind(this);
        this.updateEdge = this.updateEdge.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.getOptionHandler = this.getOptionHandler.bind(this);
        this.triggerTab = this.triggerTab.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
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
        return <Container fluid style={{marginTop: "50px"}}>
            <Row>
                <Col sm={{
                    size: 5,
                    offset: 1
                }} >
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active={this.state.tabIndex === '1'}
                                onClick={this.triggerTab('1')}
                            >
                                JSON Editor
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={this.state.tabIndex === '2'}
                                onClick={this.triggerTab('2')}
                            >
                                Editor
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.tabIndex}>
                        <TabPane tabId="1">
                            <AceEditor
                                mode="json"
                                theme="github"
                                value={this.state.value}
                                onChange={this.handleChange}
                                name="UNIQUE_ID_OF_DIV"
                                width={"100%"}
                                height={"55vh"}
                            />
                        </TabPane>
                        <TabPane tabId="2">
                            <div style={{width: "100%", height: "55vh", border: "1px solid #5c7e94"}}>
                                <></>
                            </div>
                        </TabPane>
                    </TabContent>
                </Col>
                <Col sm={{
                    size: 3,
                    offset: 1
                }}>
                    <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.handleDropdownToggle} style={{marginTop: "40px"}}>
                        <DropdownToggle outline color="secondary" className={"generate"} caret>
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
                        <Input className={"generate"} type={"number"} defaultValue="5" onChange={this.updateVertex}>Количество
                            вершин</Input>
                        <a>{this.state.labels.label2}</a>
                        <Input className={"generate"} type={"number"} defaultValue="6" onChange={this.updateEdge}>Количество
                            ребер</Input>
                        <Button className={"generate"} onClick={this.handleButtonClick} outline color="secondary">{this.state.labels.structButton}</Button>
                        <Button className={"generate"} disabled={(() => {
                            try {
                                JSON.parse(this.state.value);
                                return false;
                            } catch (e) {
                                return true;
                            }
                        })()} onClick={this.handleAddButtonClick} outline color="secondary">Добавить еще одну структуру</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }

    private triggerTab(id: string) {
        return (() => {
            this.setState({
                tabIndex: id
            })
        });
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

    private handleAddButtonClick() {
        this.handleChange(this.state.value.replace(/]$/, `,\n${this.getJSON(this.state.structToGenerate, this.state.vertexAmount, this.state.edgesAmount)}]`))
    }

    private handleDropdownToggle() {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }

    private handleButtonClick() {
        this.handleChange(`[${this.getJSON(this.state.structToGenerate, this.state.vertexAmount, this.state.edgesAmount)}]`);
    }

    private getJSON(structToGenerate: string, vertexAmount: number, edgesAmount: number) {
        switch(structToGenerate) {
            case "graphV": {
                let vertices = "";
                let edges;
                edgesAmount > 0 ? edges = "{ \"source\": , \"target\": }," : edges = "";
                for (let i = 1; i < vertexAmount; i++) {
                    vertices = vertices + '\"' + i.toString() + '\", '
                }
                for (let i = 1; i < edgesAmount; i++) {
                    edges = edges + "\n         { \"source\": , \"target\": },"
                }
                vertices = vertices + '\"' + vertexAmount + '\", '
                return "{ \"type\": \"graph\", \"value\": \n" +
                    "   { \"vertices\": [" + vertices + "], \n" +
                    "   \"edges\": \n" +
                    "       [ " + edges + " ] \n" +
                    "   } \n" +
                    "}";
            }
            case "graphVE": {
                let vertices = "";
                let edges;
                edgesAmount > 0 ? edges = "{ \"name\": 1, \"source\": , \"target\": }," : edges = "";
                for (let i = 1; i < vertexAmount; i++) {
                    vertices = vertices + '\"' + i.toString() + '\", '
                }
                for (let i = 1; i < edgesAmount; i++) {
                    edges = edges + "\n         { \"name\": " + (i+1).toString() + ", \"source\": , \"target\": },"
                }
                vertices = vertices + '\"' + vertexAmount + '\", ';
                return "{ \"type\": \"graph\", \"value\": \n" +
                    "   { \"vertices\": [" + vertices + "], \n" +
                    "   \"edges\": \n" +
                    "       [ " + edges + " ] \n" +
                    "   } \n" +
                    "}";
            }
            case "matrix": {
                return "matrix";
            }
            default: {
                return "Здесь еще ничего нет";
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