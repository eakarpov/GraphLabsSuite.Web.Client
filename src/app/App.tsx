import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar";
import Routes from "./router/Routes";
import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import {store} from "../redux/store";
import {actions} from "../redux/actions";
import * as jwt_decode from 'jwt-decode';
import {UserData} from "../types/user";

class App extends Component {
  public componentWillMount() {
      const token = localStorage.getItem('gl-token');
      if (token) {
          const tokenData = jwt_decode<UserData>(token);
          store.dispatch(actions.setLogged(true));
          store.dispatch(actions.setUserData(tokenData));
      }
  }
  public render() {
      return (
          <Provider store={store}>
              <Router>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Navbar/>
                      <Routes/>
                      <Footer/>
                  </div>
              </Router>
          </Provider>
    );
  }
}

export default App;
