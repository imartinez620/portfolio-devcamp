import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home.js"
import About from "./pages/about.js"
import Contact from "./pages/contact.js"
import Blog from "./pages/blog.js"
import PortfolioDetail from "./portfolio/portfolio-detail"
import NoMatch from "./pages/no-match.js"
import { bind } from 'file-loader';


export default class App extends Component {
  constructor(){
    super();

    this.getPortFolioItems = this.getPortFolioItems.bind(this);
  }
  getPortfolioItems() {
    axios
      .get("https://jordan.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        console.log("response data", response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    //this.getPortFolioItems();
    return (
      <div className='app'>


        <Router>
          <div>
            <h1>DevCamp React Starter</h1>
            <div>
              {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
