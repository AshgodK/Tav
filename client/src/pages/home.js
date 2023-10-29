import React, { useEffect, useState, navigate } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/employee.css';
import { Modal, Select, Table } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';
import AddEditEmployee from '../components/AddEditEmployee';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Home() {
  const [showAddEditEmployeeModal, setShowAddEditEmployeeModal] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
  const getEmployees = async () => {
    try {

      const response = await axios.get('/api/employees/get-all-employees')
      console.log(response.data)
      setEmployeesData(response.data);

      // message.success('fetching successful')


    } catch (error) {

      message.error('fetching  failed')

    }

  }

  const deleteEmployees = async (record) => {
    try {

      const response = await axios.post('/api/employees/delete-employee', {
        employeeId: record._id
      })



      message.success('delete successful')
      getEmployees()


    } catch (error) {

      message.error('delete  failed')

    }

  }


  useEffect(() => {
    getEmployees()
  }, [])
  const columns = [
    {
      title: "firstname",
      dataIndex: "firstname"
    },
    {
      title: "lastname",
      dataIndex: "lastname"
    },
    {
      title: "cin",
      dataIndex: "cin"
    },
    {
      title: "fonction",
      dataIndex: "fonction"
    }
    ,
    {
      title: "actions",
      dataIndex: "actions",
      render: (text, record) => {
        return <div>
          <EditOutlined onClick={() => {
            setSelectedItemForEdit(record)
            setShowAddEditEmployeeModal(true)
          }} />
          <DeleteOutlined className='mx-3' onClick={() => deleteEmployees(record)} />
        </div>
      }
    }

  ]

  return (

    <DefaultLayout>
      <div className='filter'>
        <div className='filter-content'>
          {/* Content on the left side */}
        </div>
        <div className='filter-button'>
          <button type="button" className='primary' onClick={() => setShowAddEditEmployeeModal(true)}>Add New</button>
        </div>
      </div>
      <div className='table-analtics'>
        <div className='table'>
          <Table columns={columns} dataSource={employeesData} pagination={{
            pageSize: 4,
          }} />
        </div>
      </div>
      {showAddEditEmployeeModal && (<AddEditEmployee
        showAddEditEmployeeModal={showAddEditEmployeeModal}
        setShowAddEditEmployeeModal={setShowAddEditEmployeeModal}
        selectedItemForEdit={selectedItemForEdit}
        getEmployees={getEmployees}
        setSelectedItemForEdit={setSelectedItemForEdit} />)}
    </DefaultLayout>

  );
}

export default Home;
