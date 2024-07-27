import React, { useEffect, useState } from 'react'
import { Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
const Register = () => {
    // Navigate
    const navigate = useNavigate();
    let [loading,setLoading]=useState(false); //for loading spinner from bootstrap
    // Form Submit 
    const submitHandler =async (values)=>{
        // console.log(values)
        try{
            setLoading(true);
            await axios.post('/user/register',values);
            message.success("Registration Completed");
            setLoading(false);
            navigate('/login')
        }catch(err){
            setLoading(false);
            message.error('Invalid username or password')
        }
    }
    // Prevent if logged in already
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);

  return (
    <>
        <div className='register-page d-flex align-items-center justify-content-center'>
            {loading && <Spinner/>}
            <Form layout='vertical' onFinish={submitHandler}>
                <h3>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                <div className='d-flex'>
                    <Link to='/login'>Already Registered,Login</Link>
                </div>
                <button className='btn btn-primary'>
                    Register
                </button>
            </Form>
        </div>
    </>
  )
}

export default Register