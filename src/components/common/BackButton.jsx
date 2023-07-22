import React from "react";
import { Link } from "react-router-dom";
import backIcon from "../../assets/img/leftArrow.png";
function BackButton({ title, icon = { backIcon }, url = "/" }) {
  return (
    <div className="flex justify-center btn-hover-left">
      <Link to={url} >
        <div className="text-center inline-flex space-x-2 items-center py-3">
          <img src={icon} className="btn-hover_icon_left" alt="BackButtonIcon" />{" "}
          <span>{title}</span>
        </div>
      </Link>
    </div>
  );
}

export default BackButton;
