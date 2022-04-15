import React from "react";
import TextContent from "./TextContent";
import InputSelect from "./InputSelect";
export default function FilterBox(props){
    return <div style={props.visible?{display:"block"}:{display:"none"}} className="filter-box">
    <TextContent
        position="absolute"
        height="24px"
        left="42px"
        top="23px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="300"
        fontSize="20px"
        lineHeight="24px"
        color="#a5a5a5"
        content="Filter"
      />
      <TextContent
        position="absolute"
        width="158px"
        height="1px"
        left="35px"
        top="59px"
        backgroundColor="white"
      />
      <InputSelect position="absolute" left="30px" top="79px" color="white" />
      <InputSelect position="absolute" left="30px" top="129px" color="white" />
    </div>
}

