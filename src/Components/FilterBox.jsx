import React,{useState} from "react";
import TextContent from "./TextContent";
import InputSelect from "./InputSelect";
export default function FilterBox(props){
    let listOfStates=[],listOfCities=[];
    for(let state in props.data){
      if(state==="loaded")
      continue;
      listOfStates.push(state);
      for(let city in props.data[state]){
        let cityName=props.data[state][city];
        if(!listOfCities.includes(cityName))
        listOfCities.push(cityName);
      }
    }
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
      <InputSelect locationData={props.data} Ref={props.filterValue} filter={props.filterValue.state} changeFilter={props.setFilterValue} data={listOfStates} name="state" position="absolute" left="30px" top="79px" color="white" content="Select State" />
      <InputSelect locationData={props.data} Ref={props.filterValue} filter={props.filterValue.city} changeFilter={props.setFilterValue}  data={(props.filterValue.state!="" && props.filterValue.state!="Select State")?props.data[props.filterValue.state]:listOfCities} name="city" position="absolute" left="30px" top="129px" color="white" content="Select City" />
    </div>
}

