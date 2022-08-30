import { Button,Typography,Space, Table} from 'antd';
import GroupModal from './group.modal';
import {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGroups,deleteGroup} from '../store/actions/groupActions';
import Flatpickr from 'react-flatpickr'
import "flatpickr/dist/themes/material_orange.css";
const { Title } = Typography;
function Groups(props){
  const [editGroup,setEditGroup] = useState(null)
  const columns = [
    {
      title: 'Название группы',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Старт группы',
        dataIndex: 'start',
        key: 'start',
        render: (start) => <a>{start.toString()}</a>,
    },
    {
        title: 'Конец группы',
        dataIndex: 'end',
        key: 'end',
        render: (end) => <a>{end.toString()}</a>,
      },
    {
      title: 'Действия',
      key: 'action',
      align:'right',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {startEditGroup(record)}}>Редактировать</a>
          <a onClick={() => {props.deleteGroupAction(record.id)}}>Удалить</a>
        </Space>
      ),
    },
  ];
  const startEditGroup = record=> {
    showModal();
    setEditGroup(record)
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(()=>{
    props.getGroupsAction()
  },[])
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (<div>
        <div className='page-header'>
        <Title>Группы</Title>
        <Button type='primary' size={'large'} onClick={showModal}>
            Добавить группу
        </Button>
        </div>
        <Table columns={columns} dataSource={props.groups} rowKey={item=>item.id}/>
        <GroupModal isModalVisible={isModalVisible} handleCancel={handleCancel} group = {editGroup}/>
    </div>)
}

const mapDispatchToProps = dispatch =>({
  getGroupsAction:bindActionCreators(getGroups,dispatch),
  deleteGroupAction:bindActionCreators(deleteGroup,dispatch)
})
const mapStateToProps = state => ({
  groups:state.groupReducers.groups
})
export default connect(mapStateToProps,mapDispatchToProps)(Groups);