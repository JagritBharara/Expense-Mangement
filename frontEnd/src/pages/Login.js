import React, { useState,useEffect } from 'react'
import { Form, Input,message } from 'antd';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {

    let [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    const submitHandler =async (values)=>{
        // console.log(values)
        try{    
            setLoading(true);
            const {data} = await axios.post('/user/login',values);
            setLoading(false);
            message.success('Login Success');
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}));
            navigate('/');
        }catch(err){
            setLoading(false);
            message.error('Something went wrong');
        }
    }

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
                <h3>Login Form</h3>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                <div className='d-flex'>
                    <Link to='/register'>Not A User,Register</Link>
                </div>
                <button className='btn btn-primary'>
                    Login
                </button>
            </Form>
        </div>
    </>
  )
}

export default Login