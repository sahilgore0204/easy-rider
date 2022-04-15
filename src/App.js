import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Ridebar from "./Components/Ridebar";
import RideInfo from "./Components/RideInfo";
import FilterBox from "./Components/FilterBox";
export default function App() {
  let [rideInfo, setRideInfo] = useState([]);
  let [loaded, setLoaded] = useState(false);
  //console.log("hello");
  let [userInfo, setUserInfo] = useState({ loaded: false });
  let [loadApiAgain, setLoadApiAgain] = useState(false);
  let [initialData,setInitialData]=useState([]);
  let [filterVisible,setVisiblity]=useState(false);
  let [locationData,setLocationData]=useState({loaded:false});
  let [filterValue,setfilterValue]=useState({
    state:"",
    city:""
})

  let [countOfRides,setCountOfRides]=useState([0,0]);
  useEffect(() => {
    console.log("triggered");
    fetch("https://assessment.api.vweb.app/user")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo({ ...data, loaded: true });
      })
      .catch((err) => {
        console.log("err");
        setLoadApiAgain(!loadApiAgain);
      });
  }, [loadApiAgain]);

  //console.log(loadRidesAgain);
  function sortByDistance(data,userStationCode){
    data.sort((ride1, ride2) => {
      let arr1 = ride1.station_path,
        arr2 = ride2.station_path;

      let min1 = arr1.reduce((pv, cv) => {
        if (Math.abs(cv - userStationCode) < pv)
          pv = Math.abs(cv - userStationCode);
        return pv;
      }, 1000);
      ride1.minDistance = min1;
      let min2 = arr2.reduce((pv, cv) => {
        if (Math.abs(cv - userStationCode) < pv)
          pv = Math.abs(cv - userStationCode);
        return pv;
      }, 1000);
      ride2.minDistance = min2;
      return min1 - min2;
    });
  }

  function sortByDate(data,opr){
        console.log(data);
        let userStationCode = Number(userInfo.station_code);
        console.log(userStationCode);
        if(opr==1){
          let newData=data.filter((ride)=>{
            let date=new Date(ride.date);
            let x=date.getTime()-Date.now();
            console.log(x);
            return x>=0;
          })
          sortByDistance(newData,userStationCode)
          setRideInfo(newData)
        }
        else{
          let newData=data.filter((ride)=>{
            let date=new Date(ride.date);
            let x=date.getTime()-Date.now();
            console.log(x);
            return x<0;
          })
          console.log(newData);
          sortByDistance(newData,userStationCode)
          setRideInfo(newData)
        }
  }
  function fetchNear(){
    setfilterValue({state:"",city:""});
    fetch("https://assessment.api.vweb.app/rides")
      .then((response) => response.json())
      .then((data) => {
        let userStationCode = Number(userInfo.station_code);
        console.log(userStationCode);
        sortByDistance(data,userStationCode);
        setRideInfo(data);
        setInitialData(data);
        let c1=0,c2=0;
        data.forEach((ride)=>{
          let date=new Date(ride.date);
          let x=date.getTime()-Date.now();
          if(x>=0)
          c1++;
          else c2++;
        });
        setCountOfRides([c1,c2]);
        setLoaded(true);
      })
  }


  function fetchUpcoming(){
    sortByDate(initialData,1);
  }

  function fetchPast(){
    sortByDate(initialData,2);
  }


  useEffect(() => {
      fetchNear();
  }, [userInfo]);

  function fetchRideData(type){
    if(type==="near"){
      fetchNear();
    }
    else if(type==="upcoming"){
      //fetch upcoming data
      fetchUpcoming();
    }
    else{
      //fech past data
      console.log("fetching for past");
      fetchPast();
    }
  }

  function fetchLocationData(){
    console.log("fetcing location");
    let tempData={};
    rideInfo.forEach((ride)=>{
      if(!tempData[ride.state])
      tempData[ride.state]=[];
      if(!tempData[ride.state].includes(ride.city))
      tempData[ride.state].push(ride.city);
    })
    console.log(rideInfo);
    console.log(tempData)
    setLocationData({...tempData,loaded:true});
  }

  useEffect(()=>{
    fetchLocationData();
  },[rideInfo])

  return (
    <div className="App">
      {userInfo.loaded && <Navbar user={userInfo} />}
      <Ridebar count={countOfRides} visible={filterVisible} visibility={setVisiblity} fetchData={fetchRideData} />
      <div className="ride-list">
        {loaded &&
          userInfo.loaded &&
          rideInfo.map((ride, ind) => {
            let {city,state}=filterValue;
            if((city==="" || city==="Select City" || city===ride.city) && (state==="" || state==="Select State" || state===ride.state))
            return <RideInfo key={ind} allInfo={ride} />;
            return "";
          })}
      </div>
      <FilterBox filterValue={filterValue} setFilterValue={setfilterValue} data={locationData} visible={filterVisible} visibility={setVisiblity} />
    </div>
  );
}
