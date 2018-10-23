import {Component} from "react";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {actions} from "../../../redux/actions";
import * as React from "react";
import {RootState} from "../../../redux/rootReducer";
import {ModuleState} from "../../../redux/reducers/module";
import AsyncWrapper from "../../containers/AsyncWrapper";
// import {Dispatch} from "redux";
// import {GetEntityAction} from "../../../types/redux";

interface StateToProps {
    module: ModuleState;
}

interface DispatchProps {
    // getModule: (id: number) => Dispatch<GetEntityAction>;
    getModule: any;
}

type Props = RouteComponentProps<{ moduleId?: string }> & DispatchProps & StateToProps;

class Module extends Component<Props> {
    private iframe: HTMLIFrameElement;

    public componentDidMount() {
        const id = parseInt(this.props.match.params.moduleId || '0', 10);
        this.props.getModule(id);
    }

    public componentDidUpdate() {
        if (this.iframe) {
            this.iframeOnLoad();
        }
    }

    public render() {
        return (
            <AsyncWrapper state={[this.props.module]}>
                <iframe
                    style={{
                        height: '100%',
                        width: '100%',
                        minHeight: '600px',
                    }}
                    allowFullScreen
                    ref={i => {
                        if (i) {
                            this.iframe = i;
                        }
                    }}
                />
            </AsyncWrapper>
        );
    }

    private iframeOnLoad() {
        const iframe = this.iframe;
        if (iframe && iframe.contentDocument) {
            const {css, js} = this.props.module.data;
            iframe.contentDocument.open();
            iframe.contentDocument.write(
                `<head></head><style>${css}</style></head><body><div id="root" /><script>${js}</script></body>`);
            iframe.contentDocument.close();
        }
    }
}

export default connect((state: RootState) => ({
    module: state.module,
}), {
    getModule: actions.getModule,
})(Module);