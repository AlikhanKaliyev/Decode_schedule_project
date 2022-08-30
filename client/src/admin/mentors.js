import { Button,Typography,Space, Table} from 'antd';
import MentorModal from './mentor.modal';
import {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getMentors,deleteMentor} from '../store/actions/mentorActions';
const { Title } = Typography;
function Mentors(props){
  const columns = [
    {
      title: 'Полное имя',
      dataIndex: 'fullname',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Действия',
      key: 'action',
      align:'right',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => startEditMentor(record)}>Редактировать</a>
          <a onClick={() => props.deleteMentorAction(record.id)}>Удалить</a>
        </Space>
      ),
    },
  ];
  const startEditMentor = record=> {
    showModal();
    setEditMentor(record)
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMentor,setEditMentor] = useState(null)
  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setEditMentor(null)
  };
  useEffect(()=>{
    props.getMentorsAction()
  },[])
    return (<div>
        <div className='page-header'>
        <Title>Менторы</Title>
        <Button type='primary' size={'large'} onClick={showModal}>
            Добавить ментора
        </Button>
        </div>
        <Table columns={columns} dataSource={props.mentors} rowKey={item=>item.id}/>
        <MentorModal isModalVisible={isModalVisible} handleCancel={handleCancel} mentor ={editMentor}/>
    </div>)
}

const mapDispatchToProps = dispatch =>({
  getMentorsAction:bindActionCreators(getMentors,dispatch),
  deleteMentorAction:bindActionCreators(deleteMentor,dispatch)
})
const mapStateToProps = state => ({
  mentors: state.mentorsReducers.mentors
})
export default connect(mapStateToProps,mapDispatchToProps)(Mentors);