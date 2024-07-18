import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component{
    constructor(){
        super();
        this.state = {
            pageTitle: 'Welcome to my portfolio',
            isLoading:true,
            data:[
                { title: "Quip", category: "eCommerce", slug: "quip" },
                { title: "Eventbrite", category: "Scheduling", slug: "eventbrite" },
                {
                  title: "Ministry Safe",
                  category: "Enterprise",
                  slug: "ministry-safe"
                },
                { title: "SwingAway", category: "eCommerce", slug: "swingaway" }
            ]
        };
        console.log("Esto es una prueba");
        //this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter){
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    portfolioItems() {
        return this.state.data.map(item => {
          return (
            <PortfolioItem title={item.title} url={"google.com"} slug={item.slug} />
          );
        });
      }

    // handlePageTitleUpdate (){
    //     this.setState({
    //         pageTitle: "Something else"
    //     })
    // }

    render(){
        // if(this.state.isLoading){
        //     return <div>Loading...</div>
        // }
        return(
            <div>
                <h2>{this.state.pageTitle}</h2>
                <PortfolioItem/>
                {this.portfolioItems()}
                <br />
                <button onClick={() => this.handleFilter("eCommerce")}>
                    eCommerce
                </button>
                <button onClick={() => this.handleFilter("Scheduling")}>
                    Scheduling
                </button>
                <button onClick={() => this.handleFilter("Enterprise")}>
                    Enterprise
                </button>
               
                {/* <button onClick= {this.handlePageTitleUpdate}>Change Title</button> */}
            </div>
            
        );
    }

}
