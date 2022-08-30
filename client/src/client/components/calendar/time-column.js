import Item from "./item";
import Col from "./col";
import { time } from "../../../utils.js/calendar";
function TimeColumn() {
    let showTime = [(<Item/>)]
    showTime = showTime.concat(time.map((t,i)=> (<Item><span>{t}</span></Item>)))
    return (
        <Col> {showTime}</Col>
    );
  }
  
  export default TimeColumn;