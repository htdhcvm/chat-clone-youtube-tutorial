import React from "react";
import "./InfoBar";

const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <h3>Room name : {room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">Leave chat</a>
        </div>
    </div>
)


export default InfoBar;