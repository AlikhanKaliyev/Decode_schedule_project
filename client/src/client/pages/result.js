import Search from "../components/search";
import Calendar from "../components/calendar";
import {useEffect,useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../config/base-url";
import {useParams,useLocation} from "react-router-dom";
import React from 'react';
import moment from 'moment';
function Result({queryname}) {
  const {id} = useParams();
  const [data,setData] = useState();
  const location = useLocation();
  const getData = (s , e) => {
    let start = s ? s : moment().clone().startOf('week').add(1,'days')
    let end = e ? e : moment().clone().endOf('week').add(1,'days')
    axios.get(`${BASE_URL}/api/search?${queryname}=${id}&start=${start}&end=${end}`)
    .then(res => {
        setData(res.data);
        console.log(res.data);
    })
  }
  const onChangeWeek = (date) => {
    let weekStart = date.clone().startOf('week').add(1,'days')
    let weekEnd = date.clone().endOf('week').add(1,'days')
    getData(weekStart,weekEnd)
  }
  // useEffect(getData,[location,id,queryname])
  useEffect(getData,[])
  return (
    <div className="result">
      <Search flexDirection = "row" placeholder="Search by Group, Room, Mentor" filterByWeek={true} onChangeWeek={onChangeWeek}/>
      <Calendar data = {data}/>
    </div>
  );
}  

export default Result;