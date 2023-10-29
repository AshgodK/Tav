import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/spinner'

function Login() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const lottieStyle = {
    width: '50%',
    height: '400px',
  };

  const formStyle = {
    width: '45%', // Adjust as needed
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', values)

      localStorage.setItem('tav-user', JSON.stringify({ ...response.data, password: '' }))
      setLoading(false);
      message.success('login successful')
      navigate('/home')

    } catch (error) {
      setLoading(false);
      message.error('login failed')

    }
  }

  return (
    <div className='register'>
      {loading && <Spinner />}
      <div className='row justify-content-center w-100 h-100' style={containerStyle}>

        <div style={formStyle}>
          <Form layout='vertical' onFinish={onFinish}>
            <h1>react app/ Login</h1>
            <hr />
            {/* ... Form items */}

            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex flex-column align-items-center'>
              <button className='primary' type='submit'>Login</button>
              <Link to='/register' style={{ marginTop: '10px' }}>
                don't have an account? Click here to sign up
              </Link>
            </div>
          </Form>
        </div>
        <div style={lottieStyle} className='lottie'>
          <lottie-player
            src="https://lottie.host/e8edb42d-4ee7-4cd5-9e30-8f666476dcf8/DzVvicRKUu.json"
            style={{ width: '100%', height: '100%' }}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Login;
