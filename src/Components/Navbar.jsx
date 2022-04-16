//this component deals with navigation bar

import React, { useState, useEffect } from "react";
import TextContent from "./TextContent";// this component is used to render each text field
import ImgContent from "./ImgContent";// this component is used to render every image field
let styleObj = { //inline styles
  position: "absolute",
  width: "100%",
  height: "84px",
  left: "0px",
  top: "0px",
  background: "#101010"
};
export default function Navbar(props) {
  //console.log(userInfo.name);
  let userInfo = props.user;
  return (
    <div style={styleObj}>
      <TextContent
        position="absolute"
        height="43px"
        left="43px"
        top="21px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="700"
        fontSize="36px"
        lineHeight="43px"
        color="#FFFFFF"
        textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        content="Eduvora"
      />
      <TextContent
        position="absolute"
        width="180px"
        textAlign="left"
        height="24px"
        left="1270px"
        top="30px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="700"
        fontSize="20px"
        lineHeight="24px"
        color="#FFFFFF"
        content={userInfo.loaded ? userInfo.name : ""}
      />
      <ImgContent
        position="absolute"
        width="44px"
        height="44px"
        right="25px"
        top="20.28px"
        background={userInfo.loaded ? `url(${userInfo.url})` : ""}
        borderRadius="22px"
        transform="rotate(-0.36deg)"
      />
    </div>
  );
}
