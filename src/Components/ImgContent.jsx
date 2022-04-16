//used for rendering all image fields, customised through props.

import React from "react";

export default function ImgContent(props) {
  let styleObj = { ...props,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%" };
  function handleClick(event){ //to handle click on filter image
    if(event.target.className==="clickable"){
      console.log("ok");
      props.visibility(!props.visible);
    }
  }
  return <div onClick={handleClick} className={props.class} style={styleObj}></div>;
}
