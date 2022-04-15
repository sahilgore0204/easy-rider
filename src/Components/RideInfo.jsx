import React from "react";
import ImgContent from "./ImgContent";
import TextContent from "./TextContent";
export default function RideInfo(props) {
  let styleObj = {
    width: "100%",
    height: "198px",
    background: "#171717",
    borderRadius: "10px",
    marginBottom: "15px",
    position: "relative"
  };
  return (
    <div style={styleObj}>
      <ImgContent
        position="absolute"
        width="296px"
        height="148px"
        left="29px"
        top="22px"
        background={`url(${props.allInfo.map_url})`}
        borderRadius="5px"
      />
      <TextContent
        position="absolute"
        height="25px"
        left="369px"
        top="25px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color="#CFCFCF"
        content="Ride id : "
        smallContent={`${props.allInfo.id}`}
      />
      <TextContent
        position="absolute"
        height="24px"
        left="369px"
        top="58px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color="#CFCFCF"
        content="Origin Station : "
        smallContent={`${props.allInfo.origin_station_code}`}
      />
      <TextContent
        position="absolute"
        height="24px"
        left="369px"
        top="90px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color="#CFCFCF"
        content="station_path : "
        smallContent={`${JSON.stringify(props.allInfo.station_path)}`}
      />
      <TextContent
        position="absolute"
        height="22px"
        left="369px"
        top="122px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color="#CFCFCF"
        content="Date : "
        smallContent={`${props.allInfo.date}`}
      />
      <TextContent
        position="absolute"
        height="18px"
        left="369px"
        top="152px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="18px"
        lineHeight="22px"
        color="#CFCFCF"
        content="Distance : "
        smallContent={`${props.allInfo.minDistance}`}
      />
      <TextContent
        position="absolute"
        left="1098px"
        top="23px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="12px"
        lineHeight="15px"
        color="#FFFFFF"
        content={props.allInfo.city}
        background="rgba(0, 0, 0, 0.56)"
        borderRadius="16px"
        boxSizing="border-box"
        padding="4px 10px"
      />
      <TextContent
        position="absolute"
        left="1178px"
        top="23px"
        fontFamily="SF Pro Display,sans-serif"
        fontStyle="normal"
        fontWeight="500"
        fontSize="12px"
        lineHeight="15px"
        color="#FFFFFF"
        content={props.allInfo.state}
        background="rgba(0, 0, 0, 0.56)"
        borderRadius="16px"
        boxSizing="border-box"
        padding="4px 10px"
      />
    </div>
  );
}

// display="flex"
//         flexDirection="row"
//         alignItems="flex-start"
//         padding="4px 10px"
