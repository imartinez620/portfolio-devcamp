import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor(){
        super();
        this.state = {
            pageTitle: 'Welcome to my portfolio',
            isLoading:true,
            data:[]
        };
        console.log("Esto es una prueba");
        //this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);

    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    getPortfolioItems() {
        axios
          .get("https://jordan.devcamp.space/portfolio/portfolio_items")
          .then(response => {
            console.log("response data", response);
            this.setState({
                data:response.data.portfolio_items
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

      portfolioItems() {
        return this.state.data.map(item => {
          return <PortfolioItem key={item.id} item={item} />;
        });
      }

    // handlePageTitleUpdate (){
    //     this.setState({
    //         pageTitle: "Something else"
    //     })
    // }

    componentDidMount() {
        this.getPortfolioItems();
      }
    

    render(){
        // if(this.state.isLoading){
        //      return <div>Loading...</div>
        //  }
        // this.getPortfolioItems();
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter("eCommerce")}>
                    eCommerce
                </button>
                <button onClick={() => this.handleFilter("Scheduling")}>
                    Scheduling
                </button>
                <button onClick={() => this.handleFilter("Enterprise")}>
                    Enterprise
                </button>

                {this.portfolioItems()}
        </div>
        );
    }

}
