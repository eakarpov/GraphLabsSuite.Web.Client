import {Component} from "react";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {RootState} from "../../../redux/rootReducer";
import {actions} from "../../../redux/actions";
// import {Dispatch} from "redux";
// import {GetEntityAction} from "../../../types/redux";

interface StateToProps {
  // getModule: (id: number) => Dispatch<GetEntityAction>;
  getModule: any;
}

type Props = RouteComponentProps<{ moduleId?: string }> & StateToProps;

class Module extends Component<Props> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.moduleId || '0', 10);
    this.props.getModule(id);
  }

  public render() {
    return null;
  }
}

export default connect((state: RootState) => ({
  getModule: actions.getModule,
}))(Module);