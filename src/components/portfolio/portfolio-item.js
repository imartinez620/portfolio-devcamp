import React from "react";
import { Link } from "react-router-dom";

export default function(props) {
  //Data we will need
  //background image
  //logo
  //description
  //id
  const { id, description, thumb_image_url, logo } = props.item;
  return (
    <div>
      <img src={thumb_image_url}></img>
      <img src={logo}></img>
      <div>{description}</div>
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  );
}