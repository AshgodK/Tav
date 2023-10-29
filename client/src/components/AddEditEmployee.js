import axios from 'axios'
import Spinner from '../components/spinner'
import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';
import { ToastContainer, toast } from "react-toastify";

function AddEditEmployee({ showAddEditEmployeeModal, setShowAddEditEmployeeModal, selectedItemForEdit, getEmployees, setSelectedItemForEdit }) {

    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {

        let erCin = "";



        const cinPattern = /^\d{8}$/; // Check for exactly 8 digits
        if (!cinPattern.test(values.cin)) {

            erCin += "check cin(8 digits)";

            message.error(erCin)


        }
        else {
            try {

                setLoading(true);
                if (selectedItemForEdit) {
                    await axios.post('/api/employees/edit-employee', { payload: { ...values }, employeeId: selectedItemForEdit._id })
                    getEmployees()
                    message.success('employee updated')
                }
                else {
                    await axios.post('/api/employees/add-employee', values)
                    getEmployees()
                    message.success('employee added')
                }
                setLoading(false);
                setShowAddEditEmployeeModal(false);
                setSelectedItemForEdit(null)

            } catch (error) {
                setLoading(false);
                message.error('wrong')

            }
        }



    }
    return (

        <Modal title={selectedItemForEdit ? 'edit employee' : 'Add employee'} open={showAddEditEmployeeModal} onCancel={() => { setShowAddEditEmployeeModal(false); setSelectedItemForEdit(null) }} footer={false}>
            {loading && <Spinner />}
            <Form layout='vertical' className='employee-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label='FirstName' name='firstname'>
                    <Input type='text'>
                    </Input>
                </Form.Item>
                <Form.Item label='LastName' name='lastname'>
                    <Input type='text'>
                    </Input>
                </Form.Item>
                <Form.Item label='Cin' name='cin'  >
                    {selectedItemForEdit ? (
                        <Input type='text' disabled value={selectedItemForEdit.cin} />
                    ) : (
                        <Input type='text' />
                    )}
                </Form.Item>
                <Form.Item label='Fonction' name='fonction'>
                    <Select>
                        <Select.Option value='f1'>
                            f1
                        </Select.Option>
                        <Select.Option value='f2'>
                            f2
                        </Select.Option>
                        <Select.Option value='f3'>
                            f3
                        </Select.Option>
                    </Select>
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'> save</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditEmployee
