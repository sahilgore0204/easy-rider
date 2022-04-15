import React,{useState} from "react";
import TextContent from "./TextContent";
import ImgContent from "./ImgContent";
export default function RideBar(props) {
  let [colors,setColors]=useState(["#ffffff","#d0cbcb","#d0cbcb"]);
  return (
    <div>
      <TextContent
        position="absolute"
        height="22px"
        left="43px"
        top="113px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="700"
        fontSize="18px"
        lineHeight="22px"
        color={colors[0]}
        content="Nearest rides"
        class="clickable near"
        changeColor={setColors}
        fetchData={props.fetchData}
      />
      <TextContent
        position="absolute"
        height="22px"
        left="205px"
        top="113px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="400"
        fontSize="18px"
        lineHeight="22px"
        color={colors[1]}
        content="Upcoming rides"
        class="clickable upcoming"
        changeColor={setColors}
        fetchData={props.fetchData}
      />
      <TextContent
        position="absolute"
        height="22px"
        left="413px"
        top="113px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="400"
        fontSize="18px"
        lineHeight="22px"
        color={colors[2]}
        content="Past Rides"
        class="clickable past"
        changeColor={setColors}
        fetchData={props.fetchData}
      />
      <ImgContent
        position="absolute"
        width="24px"
        height="24px"
        left="1442px"
        top="113px"
        background="url(images/sort.svg)"
        class="clickable"
        visible={props.visible}
        visibility={props.visibility}
      />
      <TextContent
        position="absolute"
        height="19px"
        left="1471px"
        top="115px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="19px"
        color="#F2F2F2"
        content="Filter"
        class="clickable"
        visible={props.visible}
        visibility={props.visibility}
      />
    </div>
  );
}
