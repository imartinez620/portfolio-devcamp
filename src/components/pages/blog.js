import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import BlogItem from "../blog/blog-item";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogModal from '../modals/blog-modal';

class Blog extends Component {
    constructor() {
        super();

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            blogModalIsOpen: false
        }

        this.getBlogItems = this.getBlogItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, false);
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(blog) {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
                { withCredentials: true }
            )
            .then(response => {
                this.setState({
                    blogItems: this.state.blogItems.filter(blogItem => {
                        return blog.id !== blogItem.id;
                    })
                });

                return response.data;
            })
            .catch(error => {
                console.log("delete blog error", error);
            });
    }

    handleSuccessfulNewBlogSubmission(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        });
    }

    handleNewBlogClick() {
        this.setState({
            blogModalIsOpen: true
        });
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        });
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage
        });
        //https://inakimartinez.devcamp.space/portfolio/portfolio_items
        axios
            .get(`https://inakimartinez.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
                withCredentials: true
            })
            .then(response => {
                console.log("getblogitems", response.data)
                this.setState({
                    blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                    totalCount: response.data.meta.total_records,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log("getBlogItems error", error);
            });
    }

    componentWillMount() {
        this.getBlogItems();
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        if (
            this.state.isLoading ||
            this.state.blogItems.length === this.state.totalCount
        ) {
            return;
        }

        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            this.getBlogItems();
        }
    }

    render() {
        const blogRecords = this.state.blogItems.map(blogItem => {
            if (this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div key={blogItem.id} className="admin-blog-wrapper">
                        <BlogItem blogItem={blogItem} />
                        <a onClick={() => this.handleDeleteClick(blogItem)}>
                        <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                );
            } else {
                return <BlogItem key={blogItem.id} blogItem={blogItem} />;
            }
        });

        return (
            <div className="blog-container">
                <BlogModal
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                    handleModalClose={this.handleModalClose}
                    modalIsOpen={this.state.blogModalIsOpen} />

                {this.props.loggedInStatus === "LOGGED_IN" ?
                    <div className='new-blog-link'>
                        <a onClick={this.handleNewBlogClick}>
                            <FontAwesomeIcon icon="plus-circle" />
                        </a>
                    </div> : null
                }

                {this.state.isLoading ? (
                    <div className="content-loader">
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>) : null}
                <div className="content-container">{blogRecords}</div>
            </div>
        );
    }

}
export default Blog;