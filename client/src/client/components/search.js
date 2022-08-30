import Input from './input';
import logo from '../../assets/logo-white.png'
import {useState,useEffect} from "react";
import {useLocation} from "react-router-dom";
import { BASE_URL } from '../../config/base-url';
import { DatePicker, Space } from 'antd';
import axios from "axios"
function Search(props) {
    let inputProps = {...props};
    delete inputProps.flexDirection;
    delete inputProps.filterByWeek;
    delete inputProps.onChangeWeek;
    const location = useLocation();
    const [search,setSearch] = useState('');
    const [list,setList] = useState({});
  
    
    const onChange = e => {
      setSearch(e.target.value)
      axios.get(`${BASE_URL}/api/search/` + e.target.value).then(res => {
        setList(res.data);
      }).catch(e => console.log(e));
    }
    // useEffect(()=>{
    //   setList({});
    //   setSearch('');
    // },[location])
    return (
      <div className={'search '  + props.flexDirection}>
           <img src = {logo}/>
           <Input {...inputProps} onChange ={onChange} value = {search} data = {list}/>
           {props.filterByWeek && <DatePicker onChange={props.onChangeWeek} picker="week" placeholder = "Неделя"/>}
      </div>
    );
  }
  
  export default Search;