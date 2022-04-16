import React,{useState} from "react";


export default function InputSelect(props){
    let styleObj={...props}
    function handleChange(event){ //triggered everytime change happens in any select tag
        let {name,value}=event.target; // name prop is used to distinguish between state select tag and city select tag
        console.log(`${name}: ${value}`);
        props.changeFilter(previousState=>{
            if(name==="city")
            return {...previousState,[name]:value};
            let cityName="Select City";
            if(value==="Select State" || props.locationData[value].includes(props.Ref.city))
            cityName=props.Ref.city;
            return {...previousState,[name]:value,city:cityName};
        })
        // filter hook is set above, for conditional rendering.
    }
    return <select onChange={handleChange} name={props.name} style={styleObj} value={props.filter}>
        <option value={props.content} >{props.content}</option>
        {props.data && props.data.map((element,ind)=>{
            return <option value={element} key={ind}>{element}</option>
        })}
    </select>
}