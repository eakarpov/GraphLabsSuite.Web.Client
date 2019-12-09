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
import {ModuleData} from "../../../redux/reducers/modules";

interface VariantsProps {
    variant: VariantData,
    getVariants: () => void,
    modules: ModuleData[],
    getModules: () => void,
    saveVariant: typeof actions.saveVariant
}

interface State {
    vertexAmount: number,
    edgesAmount: number,
    value: string,
    moduleId: number,
    name: string,
    isDropdownOpen: boolean,
    isDropdownOpen2: boolean,
    labels: {
        label1: string,
        label2: string,
        structButton: string
    },
    structToGenerate: string,
    currentDropdownOption: string,
    tabIndex: string
}

type Props = VariantsProps & RouteComponentProps<{id: string}> & InjectedAuthRouterProps

class VariantEditor extends Component<Props, State> {

    public state = {
        isDropdownOpen: false,
        isDropdownOpen2: false,
        moduleId: 1,
        name: "",
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

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateVertex = this.updateVertex.bind(this);
        this.updateEdge = this.updateEdge.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.getOptionHandler = this.getOptionHandler.bind(this);
        this.triggerTab = this.triggerTab.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleDropdownToggle2 = this.handleDropdownToggle2.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
        this.handleButtonClick2 = this.handleButtonClick2.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    public componentDidMount() {
        this.props.getVariants();
        this.props.getModules();
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.variant) {
            if ((prevProps.variant || {} as any).variantData !== this.props.variant.variantData) {
                this.setState({
                    value: this.props.variant.variantData,
                    name: this.props.variant.name
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
                }}>
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
                <Col sm={{                    size: 3,
                    offset: 1
                }}>
                    <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.handleDropdownToggle}
                                    style={{marginTop: "40px"}}>
                        <DropdownToggle outline color="secondary" className={"generate"} caret>
                            {this.state.currentDropdownOption}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.getOptionHandler({
                                label1: "Количество вершин",
                                label2: "Количество ребер",
                                structButton: "Генерировать структуру графа"
                            }, "graphV", "Граф с обозначением вершин")}>Граф с обозначением вершин</DropdownItem>
                            <DropdownItem onClick={this.getOptionHandler({
                                label1: "Количество вершин",
                                label2: "Количество ребер",
                                structButton: "Генерировать структуру графа"
                            }, "graphVE", "Граф с обозначением и вершин, и ребер")}>Граф с обозначением и вершин, и
                                ребер</DropdownItem>
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
                        <Button className={"generate"} onClick={this.handleButtonClick} outline
                                color="secondary">{this.state.labels.structButton}</Button>
                        <Button className={"generate"} disabled={(() => {
                            try {
                                JSON.parse(this.state.value);
                                return false;
                            } catch (e) {
                                return true;
                            }
                        })()} onClick={this.handleAddButtonClick} outline color="secondary">
                            Добавить еще одну структуру
                        </Button>
                        <p>Выберите задание</p>
                        <ButtonDropdown isOpen={this.state.isDropdownOpen2} toggle={this.handleDropdownToggle2}
                                        outline color="secondary" style={{marginRight: "0"}}>
                            <DropdownToggle outline color="secondary" className={"generate"} caret>
                                {(this.props.modules.find(m => m.id === this.state.moduleId) || {name: ""}).name}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.props.modules.map(m =>
                                    <DropdownItem
                                        key={m.id}
                                        onClick={this.handleDropdownClick(m.id)}
                                    >
                                        {m.name}
                                    </DropdownItem>)}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <p>Введите имя варианта</p>
                        <Input className={"generate"} value={this.state.name} onChange={this.updateName}>Имя</Input>
                        <Button className={"generate"} onClick={this.handleButtonClick2} outline
                                color="secondary">Сохранить</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }

    private updateName(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    private handleButtonClick2() {
        this.props.saveVariant(this.state.value, this.state.name, this.state.moduleId.toString(), this.props.match.params.id);
        if (!this.props.match.params.id) {
            this.props.getVariants();
            this.props.history.push("/variants");
        }
    }

    private handleDropdownToggle2() {
        this.setState({
            isDropdownOpen2: !this.state.isDropdownOpen2
        })
    }

    private handleDropdownClick(id: number) {
        return () => {
            this.setState({
                moduleId: id
            })

        }
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
        switch (structToGenerate) {
            case "graphV": {
                const vertices = Array.from(Array(vertexAmount).keys())
                    .map(e => `"${e}"`)
                    .join(",");
                const edges = Array.from(Array(edgesAmount))
                    .map(() => `{ "sources": "sourceName" , "target": "targetName" }`)
                    .join(",\n\t");
                return `{ "type": "graph", "value": {\n` +
                    `\t"vertices": [${vertices}], \n` +
                    `\t"edges": \n` +
                    `\t[${edges}] \n` +
                    `   } \n` +
                    `}`;
            }
            case "graphVE": {
                let vertices = "";
                let edges;
                edgesAmount > 0 ? edges = "{ \"name\": 1, \"source\": , \"target\": }" : edges = "";
                for (let i = 1; i < vertexAmount; i++) {
                    vertices = vertices + '\"' + i.toString() + '\", '
                }
                for (let i = 1; i < edgesAmount; i++) {
                    edges = edges + "\n         { \"name\": " + (i + 1).toString() + ", \"source\": , \"target\": },"
                }
                vertices = vertices + '\"' + vertexAmount + '\", ';
                return "{ \"type\": \"graph\", \"value\": \n" +
                    "   { \"vertices\": [" + vertices + "], \n" +
                    "   \"edges\": \n" +
                    "   [ " + edges + " ] \n" +
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
        variant: (state.variants.data || []).find(e => e.id === parseInt(props.match.params.id, 10)),
        modules: state.modules.data
    };
};

const mapDispatchToProps = {
    getVariants: actions.getVariants,
    getModules: actions.getModules,
    saveVariant: actions.saveVariant
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VariantEditor));