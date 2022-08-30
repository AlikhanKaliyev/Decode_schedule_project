import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAdmin} from '../store/actions/loginAdminActions';
const Login = ({loginAdminAction,token}) => {
  let navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  }
  useEffect(()=> {
    if(localStorage.getItem('token')){
      navigate('../admin')
    }
  },[])
  const onChangePassword = e => {
    setPassword(e.target.value)
  }
  const onFinish = () => {
    loginAdminAction({email,password},navigate)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='loginAdmin'>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
      >
        <Input value = {email} placeholder = "Впишите свой email" onChange={onChangeEmail}/>
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
      >
        <Input.Password value = {password} placeholder='Введите пароль' onChange={onChangePassword}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
const mapDispatchToProps = dispatch =>({
    loginAdminAction: bindActionCreators(loginAdmin,dispatch),
  })
  const mapStateToProps = state => ({
    token:state.loginAdminReducers.token
  })
export default connect(mapStateToProps,mapDispatchToProps)(Login);