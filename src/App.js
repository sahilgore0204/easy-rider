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


  return (
    <div className="App">
      {userInfo.loaded && <Navbar user={userInfo} />}
      <Ridebar visible={filterVisible} visibility={setVisiblity} fetchData={fetchRideData} />
      <div className="ride-list">
        {loaded &&
          userInfo.loaded &&
          rideInfo.map((ride, ind) => {
            return <RideInfo key={ind} allInfo={ride} />;
          })}
      </div>
      <FilterBox visible={filterVisible} visibility={setVisiblity} />
    </div>
  );
}
