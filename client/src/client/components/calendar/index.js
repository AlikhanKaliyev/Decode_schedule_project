import LessonInfo from "./lesson-info";
import BusyInfo from "./busy-info";
import {time,weekdays} from "../../../utils.js/calendar"
import Col from "./col";
import Item from "./item";
import TimeColumn from "./time-column";
function Calendar(props) {
  // let calendar = [(<TimeColumn/>)]
  const {data} = props
  function showItem(weekday,t){
      // const asArray = Object.entries(data);
      let hour = t.split(" ");
      hour = hour[0]
      let val
      if(data){
        for(let i of data){
          if(i.time == hour && i.weekday == weekday){
            val = i 
            console.log(i)
            if(val.course){
              console.log(val.course.name)
            }
          }
        }
      }
      if(!val){
        return (<span></span>)
      }
      if(!val.course){
        return (<BusyInfo text = {val.text}></BusyInfo>) 
      }
      // let val = data.filter(item => item.time == hour && item.weekday == weekday)
      // val = val[0]
      // return  val ? (<LessonInfo course={val.course.name} group={val.group.name} mentor = {val.mentor.fullname} room = {val.room.number} />) : (<span></span>)
      //  (<BusyInfo text = "Busy"/>)
      return (<LessonInfo course={val.course.name} group = {val.group.name} mentor = {val.mentor.fullname} room = {val.room.number}></LessonInfo>)
  }
  let calendar = weekdays.map(weekday => {
    let showTime = [(<Item key = {0}>{weekday}</Item>)]
    showTime = showTime.concat(time.map((t,i)=> (<Item key = {i} time={t}>
        {showItem(weekday,t)}
      </Item>)))
    return (<Col> {showTime}</Col>)
})
  return (
    <div className="calendar" >
      {calendar}
    </div>
  );
}

export default Calendar;