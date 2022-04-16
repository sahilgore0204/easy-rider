// deployment link https://easy-rider.vercel.app/
// resume link https://drive.google.com/file/d/1tOADDXPQQADbLyAG6VG6awRolA-GsA9v/view?usp=sharing

import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";//this component is for companay name, username and its profile picture
import Ridebar from "./Components/Ridebar";// this component displays information of different states of rides like nearest one,upcoming and past
                                            // also comprises of the filter box
import RideInfo from "./Components/RideInfo"; //this component display all the ride details
import FilterBox from "./Components/FilterBox";// this component is for taking user input for state and city filter
export default function App() {
  let [rideInfo, setRideInfo] = useState([]); //state for data fetched form ride api
  let [loaded, setLoaded] = useState(false);// when ride api data fetching is successful it is set to true
  //console.log("hello");
  let [userInfo, setUserInfo] = useState({ loaded: false }); //state for data fetched from user api
  let [loadApiAgain, setLoadApiAgain] = useState(false);// sometimes userapi fails to fetch due to cors policy, so when it happens this state is changed to make user api call again
  let [initialData,setInitialData]=useState([]);// rideInfo data changes upon user selection, this state us used for storing the initial version that was feched from api itself
  let [filterVisible,setVisiblity]=useState(false);//this state toggles the visibility of filter box based on iser click event
  let [locationData,setLocationData]=useState({loaded:false});// state for storing the data about cities and states from the rideInfo data that we fetched
  let [filterValue,setfilterValue]=useState({  // state for filters chosen by users, required for conditionally rendereing rideInfo data as well as for constructing filter UI
    state:"",
    city:""
})

  //let [countOfRides,setCountOfRides]=useState([0,0,0]);


  //below useEffect is for fetching user information with dependency as loadApiAgain which ensures that data fetching never fails
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
  //below function sorts our rideInfo wrt nearest ride from user.
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

  //elow function sorts the ride data wrt to date, based on opr it sorts it into either upcoming rides or past rides
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

  //below function is used to fetch new ride data, triggeres every time user click on nearest rides
  // I assumed that everytime user clicks on nearest rides, he needs to know the closest rides from him and every time api returns different data, thats why this type of UI is implemented
  function fetchNear(){
    setfilterValue({state:"",city:""});
    //setCountOfRides([0,0,0]);
    fetch("https://assessment.api.vweb.app/rides")
      .then((response) => response.json())
      .then((data) => {
        let userStationCode = Number(userInfo.station_code);
        console.log(userStationCode);
        sortByDistance(data,userStationCode);
        setRideInfo(data);
        setInitialData(data);
        setLoaded(true);
      })
  }

  //trigggered when user clicks on upcoming rides
  function fetchUpcoming(){
    sortByDate(initialData,1);
  }

  // triggered when user clicks on past rides
  function fetchPast(){
    sortByDate(initialData,2);
  }

  // used to fetch ride data intially
  useEffect(() => {
      fetchNear();
  }, [userInfo]);

  //this is for clicking of ride types
  function fetchRideData(type){
    if(type==="near"){
      fetchNear();
    }
    else if(type==="upcoming"){
      //fetch upcoming data
      //setCountOfRides([0,0,0]);
      fetchUpcoming();
    }
    else{
      //fech past data
      console.log("fetching for past");
      //setCountOfRides([0,0,0]);
      fetchPast();
    }
  }


  //to fetch the states and cities everytime new ride data arrives.
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

  // to fetch location data every evertime rideInfo changes
  useEffect(()=>{
    fetchLocationData();
  },[rideInfo])
  
  return (
    <div className="App">
      {userInfo.loaded && <Navbar user={userInfo} />}
      <Ridebar visible={filterVisible} visibility={setVisiblity} fetchData={fetchRideData} />
      <div className="ride-list">
        {loaded &&
          userInfo.loaded &&
          rideInfo.map((ride, ind) => {
            let {city,state}=filterValue;
            //conditional rendering based on city and state chosen
            if((city==="" || city==="Select City" || city===ride.city) && (state==="" || state==="Select State" || state===ride.state)){
            return <RideInfo key={ind} allInfo={ride} />;
            }
            return "";
          })}
      </div>
      <FilterBox filterValue={filterValue} setFilterValue={setfilterValue} data={locationData} visible={filterVisible} visibility={setVisiblity} />
    </div>
  );
}
