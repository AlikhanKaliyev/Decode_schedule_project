import Main from './client/pages/main'
import Result from './client/pages/result';
import {Routes,Route,useLocation} from 'react-router-dom';
import Admin from './admin';
import {Provider} from 'react-redux';
import configureStore from './store';
import Mentors from './admin/mentors';
import Lessons from './admin/lessons'
import Groups from './admin/groups';
import Login from './admin/login';
import {useState,useEffect} from 'react';
const store = configureStore();
function App() {
  const [token,setToken] = useState(null)
  // useEffect(()=>{
  //   localStorage.clear()
  //   },[])
  let location = useLocation();
  return (
    <Provider store ={store}>
    <div className="page">
      <Routes>
        <Route path = "/" element={<Main />}/>
        <Route path = '/group/:id' element ={ <Result  key= {location.pathname} queryname = "group_id"/>}/>
        <Route path = '/mentor/:id' element ={ <Result key = {location.pathname} queryname = "mentor_id"/>}/>
        <Route path = '/room/:id' element ={<Result key={location.pathname} queryname = "room_id"/>}/> 
        <Route path = 'admin' element ={<Admin />}>
          <Route path='' element={<Mentors/>}/>
          <Route path='mentor' element={<Mentors/>}/>
          <Route path='group' element={<Groups/>}/>
          <Route path='schedule' element={<Lessons/>}/>
        </Route>
        <Route path = 'signin' element = {<Login / >} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
