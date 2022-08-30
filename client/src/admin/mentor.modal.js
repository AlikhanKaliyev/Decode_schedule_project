import {Modal,Input,Button} from 'antd'
import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../store/actions/mentorActions';
import { UserOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
function MentorModal({isModalVisible,handleCancel,loading,createMentorAction,mentor,updateMentorAction}){
    const [name,setName] = useState('')
    const handleOk = () => {
      if(!mentor){
        createMentorAction(name)
      } else{
        updateMentorAction({id:mentor.id,name})
      }

      };
    const onChange = e  => {
      setName(e.target.value)
    }
    useEffect(() => {
      if(mentor){
        setName(mentor.fullname)
      }
    },[mentor])
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
    <Input value = {name} onChange = {onChange}size="large" placeholder="large size" prefix={<UserOutlined />} />
  </Modal>)
}

const mapDispatchToProps = dispatch =>({
  createMentorAction: bindActionCreators(createMentor,dispatch),
  updateMentorAction: bindActionCreators(updateMentor,dispatch)
})
const mapStateToProps = state => ({
  loading:state.mentorsReducers.isLoading
})
export default connect(mapStateToProps,mapDispatchToProps)(MentorModal);
