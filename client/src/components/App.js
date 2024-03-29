import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Landing from './Landing';
import * as actions from '../actions';


class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    // window.history.pushState("","","/shgor")
    return(
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route exact path='/surveys/new' component={SurveyNew} />

          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(
  null,
  actions
)(App);

