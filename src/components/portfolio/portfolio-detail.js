import React, { Component } from "react";
import axios from "axios";

// banner_image_url
// : 
// "https://devcamp-space.s3.amazonaws.com/Q3hV8Wk6M9ipuuGfJqDnjJpT?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.jpg%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20240825%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240825T084522Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=c3319d7a215748ccc9b7084f4f00e9a0d2e57b0598c94e32ebe1e26204d40ff0"
// category
// : 
// "Social Media"
// column_names_merged_with_images
// : 
// (9) ['id', 'name', 'description', 'url', 'category', 'position', 'thumb_image', 'banner_image', 'logo']
// description
// : 
// "Keep track of what you learn every day."
// id
// : 
// 105
// logo_url
// : 
// "https://devcamp-space.s3.amazonaws.com/bvB4CCjhJnREPYt97pYFBDDo?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.png%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20240825%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240825T084522Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=b3f81512d25c38a77975a4f01f7a45ed4dccb333566ec1aac0f4f9c517ed1df3"
// name
// : 
// "DailySmarty"
// position
// : 
// 2
// thumb_image_url
// : 
// "https://devcamp-space.s3.amazonaws.com/vYTorNakM1wpMSaD1Rr33kCd?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.jpg%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20240825%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240825T084522Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=9ee0e574f42b9d0be6525827f4c49c02aeabc88d37cafe9e780140b8a5307534"
// url
// : 
// "http://www.dailysmarty.com"

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {}
    }
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug
        }`,
        { withCredentials: true }
      )
      .then(response => {
        this.setState({
          portfolioItem: response.data.portfolio_item
        })
      })
      .catch(error => {
        console.log("getportfolioitem error", error);
      });
  }

  render() {

    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url
    } = this.state.portfolioItem;

    const bannerStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }

    const logoStyles = {
      width: "200px"
    };

    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div classNaem="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {name}
          </a>
        </div>
      </div>
    );
  }
}