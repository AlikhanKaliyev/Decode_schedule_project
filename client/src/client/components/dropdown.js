import {Link} from 'react-router-dom';
function Dropdown({data,onSelectItem}) {
    const list = [] 
    Object.keys(data).map((key,index)=> {
        data[key].length > 0 && list.push(<li key = {`header-${index}`}className="dropdown-header">{key}</li>)
        data[key].map((item,i) => {
            list.push((<li key = {`item-${index}-${i}`}className="dropdown-item"> 
            {!onSelectItem ? <Link to={item.name ? `/group/${item.id}` 
            : item.fullname ? `/mentor/${item.id}` 
            : `/room/${item.id}`}>
              {item.name || item.number || item.fullname} 
              </Link> :<a onClick={() => onSelectItem(item.name ? 'group_id' : item.fullname ? 'mentor_id' : 'room_id',item.id)}>{item.name || item.number || item.fullname} </a>} </li>))
        })
    })
    return (
      <ul className="dropdown-list">
            {list}
      </ul>
    );
  }
  
  export default Dropdown;