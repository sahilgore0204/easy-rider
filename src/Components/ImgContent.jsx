import React from "react";

export default function ImgContent(props) {
  let styleObj = { ...props,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%" };
  function handleClick(event){
    if(event.target.className==="clickable"){
      console.log("ok");
      props.visibility(!props.visible);
    }
  }
  return <div onClick={handleClick} className={props.class} style={styleObj}></div>;
}
