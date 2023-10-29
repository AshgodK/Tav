import React from 'react'
import '../resources/default-layout.css';
import { Button, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('tav-user'))
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: (
                <li onClick={() => {
                    localStorage.removeItem('tav-user')
                    navigate('/login')
                }}>Logout</li>
            ),
        },

    ];
    return (
        <div className='layout'>
            <div className="header d-flex justify-content-between align-items-center">
                <div >
                    <h1 className='logo'> react APP</h1>
                    <li style={{ cursor: 'pointer' }} className='primary' onClick={() => {

                        navigate('/permi')
                    }}>Permi</li>
                    <li style={{ cursor: 'pointer' }} className='primary' onClick={() => {

                        navigate('/home')
                    }}>Employee</li>
                    <li style={{ cursor: 'pointer' }} className='primary' onClick={() => {

                        navigate('/etablissement')
                    }}>Etablissement</li>
                </div>
                <div className='username'>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                    >
                        <button className='primary'>{user.name}</button>
                    </Dropdown>

                </div>

            </div>
            <div className='content'>
                {props.children}
            </div>


        </div>
    )
}

export default DefaultLayout
