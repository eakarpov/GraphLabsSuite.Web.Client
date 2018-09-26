import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar";
import Routes from "./router/Routes";
import {Component} from "react";

class App extends Component {
  public render() {
      return (
      <Router>
          <div>
              <Navbar App={Routes}/>
              <Footer/>
          </div>
      </Router>
    );
  }
}

export default App;
