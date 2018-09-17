import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar";
import Routes from "./router/Routes";

class App extends React.Component {
  public render() {
      return (
      <Router>
          <div>
              <Navbar/>
              <Routes/>
              <Footer/>
          </div>
      </Router>
    );
  }
}

export default App;
