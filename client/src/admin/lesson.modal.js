import react,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../store/actions/mentorActions';
import { getGroups } from '../store/actions/groupActions';
import { getRooms } from '../store/actions/roomActions';
import { getCourses } from '../store/actions/courseActions';
import { getMentors } from '../store/actions/mentorActions';
import { createLesson ,updateLesson,createBusy,updateBusy} from '../store/actions/lessonActions';
import {Modal , Input , Button, Form} from 'antd'
import { weekdays, time } from '../utils.js/calendar';
import { bindActionCreators } from 'redux';
import { Select } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import { OmitProps } from 'antd/lib/transfer/ListBody';
import { Tabs } from 'antd';
const { Option } = Select;
const { TabPane } = Tabs;

function LessonModal({ isModalVisible , 
    handleCancel, 
    loading, 
    getGroupsAction,
    getRoomsAction,
    getCoursesAction,
    getMentorsAction,
    rooms,
    courses,
    groups,
    mentors,
    createLessonAction,
    errors,
    lesson,
    updateLessonAction,
    createBusyAction,
    updateBusyAction
}){
    const [text,setText] = useState('')
    const [course_id, setCourse] = useState("");
    const [group_id, setGroup] = useState("");
    const [mentor_id, setMentor] = useState("");
    const [room_id, setRoom] = useState("");
    const [activeTab,setActiveTab] = useState(1)
    const [lessonInputs, setLessonInputs] = useState([{
        time: "",
        weekday: ""
    }]);
    const onChangeText = e =>{
        setText(e.target.value)
    }
    useEffect(() => {
        console.log(activeTab)
        if(lesson){
            if(lesson.text){
                setActiveTab(2)
            } else {
                setActiveTab(1)
            }
        }
    },[lesson])
    console.log(rooms, courses, groups, mentors)
    console.log(lesson)
    const handleOk = () => {
        if(activeTab == 1){
        console.log(lessonInputs)
        if(!lesson){
        createLessonAction({
            course_id,
            room_id,
            mentor_id,
            group_id,
            lessonInputs
        })
        setCourse(null)
        setMentor(null)
        setRoom(null)
        setGroup(null)
        setLessonInputs([{
            time:"",
            weekday:""
        }])
    } else {
            setActiveTab(1)
        updateLessonAction({
            id: lesson.id,
            course_id,
            room_id,
            mentor_id,
            group_id,
            weekday:lessonInputs[0].weekday,
            time:lessonInputs[0].time,
            text
        })
        setCourse(null)
        setMentor(null)
        setRoom(null)
        setGroup(null)
        setLessonInputs([{
            time:"",
            weekday:""
        }])
        setText(null)
    }}
    else {
        if(!lesson){
            createBusyAction({
                mentor_id,
                text,
                weekday:lessonInputs[0].weekday,
                time:lessonInputs[0].time,

            })
            setText(null)
            setMentor(null)
            setLessonInputs([{
                time:"",
                weekday:""
            }])
        } else {
            updateBusyAction({
                id:lesson.id,
                mentor_id,
                text,
                weekday:lessonInputs[0].weekday,
                time:lessonInputs[0].time,
            })
            setText(null)
            setMentor(null)
            setLessonInputs([{
                time:"",
                weekday:""
            }])
        }
    }
    };

    const onChangeCourse = value => {
        setCourse(value)
    }

    const onChangeGroup = value => {
        setGroup(value)
    }

    const onChangeMentor = value => {
        setMentor(value)
    }

    const onChangeRoom = value => {
        setRoom(value)
    }

    useEffect(() => {
        if(!loading && !errors) {
            setCourse(null)
            setGroup(null)
            setMentor(null)
            setRoom(null)
            setLessonInputs([{
                time: "",
                weekday: ""
            }])
            handleCancel();
        } 
    }, [loading])
    useEffect(() => {
        if(lesson){
            setCourse(lesson.course_id)
            setGroup(lesson.group_id)
            setMentor(lesson.mentor_id)
            setRoom(lesson.room_id)
            setLessonInputs([{
                time:lesson.time,
                weekday:lesson.weekday
            }])
            setText(lesson.text)
        console.log(lesson)
        } else {
            setCourse(null)
            setGroup(null)
            setMentor(null)
            setRoom(null)
            setLessonInputs([{
                time:'',
                weekday:''
            }])
        }
    },[lesson])
    useEffect(() => {
        getGroupsAction()
        getRoomsAction()
        getCoursesAction()
        getMentorsAction()
    },[])

    const onChangeWeekday = (index, value) => {
        const list = [...lessonInputs]
        list[index].weekday = value;
        setLessonInputs(list)
    }

    const onChangeTime = (index, value) => {
        const list = [...lessonInputs]
        list[index].time = value
        setLessonInputs(list)
    }

    const addLesson = () => {
        setLessonInputs([...lessonInputs, {weekday: "", time: ""}])
    }

    const deleteLesson = index => {
        const list = [...lessonInputs]
        list.splice(index, 1)
        setLessonInputs(list)
    }
    const onChange = (key) => {
        setActiveTab(key)
        console.log(activeTab);
      };

    return(
        <Modal 
            title="Добавление записи" 
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
        ]}> 
        <Tabs activeKey={`${activeTab}`} onChange={onChange}>
            <TabPane tab="Уроки" key="1">
            <Form.Item validateStatus={errors && errors.course_id ? "error" : "success"} help={errors && errors.course_id ? errors.course_id : ""} key="100">
                <Select
                    showSearch
                    style={{
                        width: "100%",
                       
                    }}
                    size="large"
                    placeholder="Search to Course"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={course_id => {
                        setCourse(course_id)
                    }}
                    value={course_id&&course_id}
                >
                    {courses.map(item => <Option value={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.group_id ? "error" : "success"} help={errors && errors.group_id ? errors.group_id : ""} key="101">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Group"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeGroup}
                value = {group_id}
            >
                {groups.map(item => <Option value={item.id}>{item.name}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.mentor_id ? "error" : "success"} help={errors && errors.mentor_id ? errors.mentor_id : ""} key="102">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Mentor"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeMentor}
                value = {mentor_id}
            >
                {mentors.map(item => <Option value={item.id}>{item.fullname}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.room_id ? "error" : "success"} help={errors && errors.room_id ? errors.room_id : ""} key="103">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Room"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeRoom}
                value = {room_id}
            >
                {rooms.map(item => <Option value={item.id}>{item.number}</Option>)}
            </Select>
            </Form.Item>
            </TabPane>
            <TabPane tab="Занятость преподавателя" key="2">
            <Form.Item validateStatus={errors && errors.mentor_id ? "error" : "success"} help={errors && errors.mentor_id ? errors.mentor_id : ""} key="105">
            <Select
                showSearch
                style={{
                    width: "100%",
                   
                }}
                size="large"
                placeholder="Search to Mentor"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange={onChangeMentor}
                value = {mentor_id}
            >
                {mentors.map(item => <Option value={item.id}>{item.fullname}</Option>)}
            </Select>
            </Form.Item>
            <Form.Item validateStatus={errors && errors.text ? "error" : "success"} help={errors && errors.text ? errors.text : ""} key="106">
            <Input value = {text} onChange={onChangeText} size="large" placeholder='Коммент'/>
            </Form.Item>
            </TabPane>

            </Tabs>
            {lessonInputs.map((lessonInput, index) => <div style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
            }}>
                <Form.Item style={{
                            width: "calc(50% - 10px)",
                           
                        }}
                        validateStatus={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].weekday ? "error" : "success"} 
                        help={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].weekday? errors.lessonInputs[index].weekday : ""}
                        key="108"
                        >
                    <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to weekdays"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeWeekday(index, value)}
                        value = {lessonInputs[index].weekday ? lessonInputs[index].weekday: undefined}
                    >
                        {weekdays.map(item => <Option value={item}>{item}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item style={{
                            width: "calc(50% - 10px)",
                           
                        }}
                        validateStatus={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].time ? "error" : "success"} 
                        help={errors && errors.lessonInputs && errors.lessonInputs[index] && errors.lessonInputs[index].time? errors.lessonInputs[index].time : ""}
                        key="107"
                        >
                    <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to Time"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        onChange={value => onChangeTime(index, value)}
                        value = {lessonInputs[index].time ? lessonInputs[index].time:undefined}
                    >
                        {time.map(item => {
                            let t = item.split(" ");
                            t = t[0]
                            return <Option value={t}>{item}</Option>
                        })}
                    </Select>
                </Form.Item>
                {lesson===null &&
                <CloseOutlined
                onClick={() => deleteLesson(index)}
                style={{
                    color: "#ff0000",
                    position: "absolute",
                    right: "-18px",
                    top: "13px",
                    cursor: "pointer"
                }}/> }
            </div>)}
            {lesson===null &&
            <Button onClick={addLesson}>Add</Button>
            }
        </Modal>
    )
}


const mapDispatchToProps = dispatch => ({
    createLessonAction: bindActionCreators(createLesson, dispatch),
    updateMentorAction: bindActionCreators(updateMentor, dispatch),
    getGroupsAction: bindActionCreators(getGroups, dispatch),
    getRoomsAction: bindActionCreators(getRooms, dispatch),
    getCoursesAction: bindActionCreators(getCourses, dispatch),
    getMentorsAction: bindActionCreators(getMentors, dispatch),
    updateLessonAction:bindActionCreators(updateLesson,dispatch),
    createBusyAction:bindActionCreators(createBusy,dispatch),
    updateBusyAction:bindActionCreators(updateBusy,dispatch)
})

const mapStateToProps = state => ({
    loading: state.lessonsReducers.isLoading,
    rooms: state.roomsReducers.rooms,
    courses: state.coursesReducers.courses,
    mentors: state.mentorsReducers.mentors,
    errors: state.lessonsReducers.errors,
    groups: state.groupReducers.groups,
})

export default  connect(mapStateToProps, mapDispatchToProps)(LessonModal)