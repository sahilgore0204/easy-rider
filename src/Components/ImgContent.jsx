import React from "react";

export default function ImgContent(props) {
  let styleObj = { ...props };
  function handleClick(event){
    if(event.target.className==="clickable"){
      console.log("ok");
      props.visibility(!props.visible);
    }
  }
  return <div onClick={handleClick} className={props.class} style={styleObj}></div>;
}
