import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/home';
import Pharmacy from './components/pages/pharmacy';
import OutsidePatient from './components/pages/outsidePatient';
import Inquery from './components/pages/inquery';
import ViewInquery from './components/pages/inqView';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/Home' component={Homepage} />
          <Route exact path='/Pharmacy' component={Pharmacy} />
          <Route exact path='/OutsidePatient' component={OutsidePatient} />
          <Route exact path='/Inquery' component={Inquery} />
          <Route exact path='/ViewInquery' component={ViewInquery} />
          <Footer />

        </div>
      </Router>

    )
  }
}

export default App;
