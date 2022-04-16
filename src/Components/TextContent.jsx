//every text field is rendered through this component, props are used for customization

import React from "react";

export default function TextContent(props) {
  let styleObj = { ...props };
  //console.log(styleObj);
  let grey="#d0cbcb",white="#ffffff";
  // below function is used for handling clicks on certail text fields 
  function handleClick(event){
    if(event.target.className.includes("clickable")){
      let classArray=event.target.className.split(' ');
      console.log(classArray);
      if(classArray.length>1){
        props.changeColor((ps)=>{
          let arr=["","",""];
          if(classArray[1]==="near"){
            arr[1]=grey;
            arr[2]=grey;
            arr[0]=white;
            props.fetchData(classArray[1]);
          }
          else if(classArray[1]==="upcoming"){
            arr[1]=white;
            arr[0]=grey;
            arr[2]=grey;
            props.fetchData(classArray[1]);
          }
          else{
            arr[2]=white;
            arr[1]=grey;
            arr[0]=grey;
            props.fetchData(classArray[1]);
          }
          return arr;
        })
      }
      else{
        props.visibility(!props.visible);
      }
    }
  }
  return (
    <div onClick={handleClick} className={props.class} style={styleObj}>
      {props.content}
      <span>{props.smallContent}</span>
    </div>
  );
}
