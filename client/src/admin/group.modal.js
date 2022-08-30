import {Modal,Input,Button} from 'antd'
import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {createGroup,updateGroup} from '../store/actions/groupActions';
import { createMentor, updateMentor } from '../store/actions/mentorActions';
import { UserOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/material_orange.css";
function GroupModal({isModalVisible,handleCancel,loading,createGroupAction,group,updateGroupAction}){
    const [name,setName] = useState('')
    const [start,setStart] = useState(null)
    const [end,setEnd] = useState(null)
    const handleOk = () => {
        if(!group){
        createGroupAction(name,start,end)
        setName('')
        setStart(null)
        setDate1(null)
        setEnd(null)
        setDate2(null)
        handleCancel()
      } else {
        updateGroupAction({id:group.id,name,start,end})
        setName('')
        setStart(null)
        setDate1(null)
        setEnd(null)
        setDate2(null)
        handleCancel()
      }
      };
    
    const [date1,setDate1] = useState('')
    const [date2,setDate2] = useState('')
    const onChange = e  => {
      setName(e.target.value)
    }
    useEffect(() => {
      if(group){
        setName(group.name)
        setStart(group.start)
        setEnd(group.end)
        setDate1(group.start)
        setDate2(group.end)
      } else {
        setName('')
        setDate1(null)
        setDate2(null)
        setStart(null)
        setEnd(null)
      }
    },[group])
    useEffect(() => {
      if(!loading){
        setName('')
        handleCancel()
      }
    },[loading])
    return (<Modal 
    title="Basic Modal" 
    visible={isModalVisible} 
    onOk={handleOk} 
    onCancel={handleCancel}
    footer={[
        <Button key="back" onClick={handleCancel}>
          Отмена
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Сохранить
        </Button>
      ]}
>       
      <p>Введите имя</p>
      <br></br>
      <Input value = {name} onChange = {onChange}size="large" placeholder="имя группы" prefix={<UserOutlined />} />
      <br></br>
      <br></br>
      Выберите старт группы
      <br></br>
      <br></br>
      <Flatpickr
                          data-enable-time
                          value={date1}
                          onChange={date1 => {
                          setStart(date1[0]);
                          
                          console.log(date1[0])
                          }}
                      />
      <br></br>
      <br></br>
      Выберите конец группы
      <br></br>
      <br></br>
      <Flatpickr
                    data-enable-time
                    value={date2}
                    onChange={date2 => {
                    setEnd(date2[0]);
                    console.log(date2[0])
                    }}
                />
  </Modal>)
}

const mapDispatchToProps = dispatch =>({
  createGroupAction: bindActionCreators(createGroup,dispatch),
  updateGroupAction: bindActionCreators(updateGroup,dispatch)
})
const mapStateToProps = state => ({
  loading:state.mentorsReducers.isLoading
})
export default connect(mapStateToProps,mapDispatchToProps)(GroupModal);
