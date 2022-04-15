import React,{useState} from "react";


export default function InputSelect(props){
    let styleObj={...props}
    function handleChange(event){
        let {name,value}=event.target;
        console.log(`${name}: ${value}`);
        props.changeFilter(previousState=>{
            if(name==="city")
            return {...previousState,[name]:value};
            let cityName="Select City";
            if(value==="Select State" || props.locationData[value].includes(props.Ref.city))
            cityName=props.Ref.city;
            return {...previousState,[name]:value,city:cityName};
        })
    }
    return <select onChange={handleChange} name={props.name} style={styleObj} value={props.filter}>
        <option value={props.content} >{props.content}</option>
        {props.data && props.data.map((element,ind)=>{
            return <option value={element} key={ind}>{element}</option>
        })}
    </select>
}