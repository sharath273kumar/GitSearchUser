import React from "react";
import "./clear-cache.styles.css";

export const ClearCache = (props) => (
    <button type="button" onClick={props.handler}>Clear Cache</button>
);
