import React from "react";
import "./card.styles.css";

export const Card = (props) => (
  <div className="card-container">
    <img
      alt="user"
      src={props.user.avatar_url}
    />
    <h2> {props.user.login} </h2>
  </div>
);
