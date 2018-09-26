import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import {Component, SFC} from "react";
import classNames from 'classnames';
import {styles} from "./styles";
import {Divider, Drawer, List} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import {mainListItems} from "../../menus/MainMenu";
import {RouteComponentProps, withRouter} from "react-router";

interface Props extends RouteComponentProps<{}> {
  classes: any;
  App: SFC<{}>;
}

interface State {
  open: boolean;
}

class Navbar extends Component<Props, State> {
  public state = {
    open: false,
  };

  constructor(props: Props) {
    super(props);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.getActions = this.getActions.bind(this);
    this.goMain = this.goMain.bind(this);
  }

  public render() {
    const {classes, App} = this.props;
    return (
      <div>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title} onClick={this.goMain}>
                GraphLabs
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems(this.getActions())}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <App />
          </main>
        </div>
      </div>
    );
  }
  private handleDrawerOpen() {
    this.setState({
      open: true,
    });
  }
  private handleDrawerClose() {
    this.setState({
      open: false,
    });
  }
  private getActions() {
    return {
      modules: () => this.props.history.push('modules'),
    }
  }
  private goMain() {
    this.props.history.push('/');
  }
}

export default withRouter(withStyles(styles)(Navbar));