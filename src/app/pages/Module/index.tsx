import {Component} from "react";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {actions} from "../../../redux/actions";
// import {Dispatch} from "redux";
// import {GetEntityAction} from "../../../types/redux";

interface DispatchProps {
  // getModule: (id: number) => Dispatch<GetEntityAction>;
  getModule: any;
}

type Props = RouteComponentProps<{ moduleId?: string }> & DispatchProps;

class Module extends Component<Props> {
  public componentDidMount() {
    const id = parseInt(this.props.match.params.moduleId || '0', 10);
    this.props.getModule(id);
  }

  public render() {
    return null;
  }
}

export default connect(null, {
  getModule: actions.getModule,
})(Module);