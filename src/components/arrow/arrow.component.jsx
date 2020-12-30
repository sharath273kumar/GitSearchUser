import React from "react";
import leftImage from '../../images/left.png';
import rightImage from '../../images/right.png';
import './arrow.styles.css'

export const Arrow = (props) => (
    <img
      className={props.name}
      alt={props.name}
      src={props.name === 'left-arrow' ? leftImage : rightImage}
      onClick={props.handler}
    />
);
