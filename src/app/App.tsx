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

class App extends Component {
  public render() {
      return (
          <Provider store={store}>
              <Router>
                  <div>
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
