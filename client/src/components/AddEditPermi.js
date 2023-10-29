import axios from 'axios'
import Spinner from '../components/spinner'
import React, { useState, useEffect } from 'react';
import { Modal, Select } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';

function AddEditPermi({ showAddEditPermiModal, setShowAddEditPermiModal, selectedItemForEdit, getPermis, setSelectedItemForEdit, etablissementsData, setEtablissementsData, empsData, setEmpsData }) {

    const [loading, setLoading] = useState(false);

    //[selectedEmployee, setSelectedEmployee] = useState([]);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const getEtablissements = async () => {
        try {
            const response = await axios.get('/api/etablissements/get-all-etablissements');
            console.log('Etablissements Response:', response.data);
            setEtablissementsData(response.data);
            // message.success('Fetching etab data successful');
        } catch (error) {
            console.error('Error fetching etablissements:', error);
            // message.error('Fetching failed');
        }
    };
    const getEmps = async () => {
        try {
            const response = await axios.get('/api/employees/get-all-employees');
            console.log('emps Response:', response.data);
            setEmpsData(response.data);
            message.success('Fetching emps data successful');
        } catch (error) {
            console.error('Error fetching emps:', error);
            message.error('Fetching failed');
        }
    };

    const [image, setImage] = useState(null);
    const [selectedCIN, setSelectedCIN] = useState('');






    const getEmpByCin = async (cinn) => {
        try {
            const response = await axios.get('/api/employees/get-employee-by-cin', {
                params: { cin: cinn },
            });
            const employeeData = response.data;
            setSelectedEmployee(prevEmployee => {
                // Using the state callback to ensure you're working with the latest state
                console.log('kkkkk' + employeeData); // This will show the correct data
                return employeeData;
            });
            console.log('dd' + selectedEmployee)
            // setCurrentSelectedEmployee(employeeData);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };




    useEffect(() => {
        if (selectedCIN) {
            getEmpByCin(selectedCIN);
        }
    }, [selectedCIN]);

    const onValueChange = (selectedCIN) => {
        console.log(selectedCIN)
        setSelectedCIN(selectedCIN);
        if (selectedCIN) {
            getEmpByCin(selectedCIN);
        }
        console.log(selectedEmployee)
    };




    const onImageChange = (e) => {

        if (e.target.files && e.target.files.length > 0) {
            const imageName = e.target.files[0].name; // Get the name of the selected image
            setImage(imageName);
            console.log("image", image)
            // Set the selected image in the state
            // Update the user object with the image name
        }
    };
    const onFinish = async (values) => {
        let erDate = "";
        var today = new Date();
        var Udate = new Date(values.validite);



        if (Udate < today) {
            //Do something..
            erDate += "date must be superior to today"
            message.error(erDate)
        }

        else {
            try {
                setLoading(true);

                if (selectedItemForEdit) {


                    const response = await axios.get('/api/employees/get-employee-by-cin', {
                        params: { cin: selectedItemForEdit.cin },
                    });
                    console.log('cin' + selectedItemForEdit.cin)
                    const employeeData = response.data;
                    console.log(employeeData);

                    console.log(selectedItemForEdit.cin)
                    // getEmpByCin(selectedItemForEdit.cin)
                    console.log('jjjj' + employeeData.lastname)
                    const updatedValues = { ...values, lastname: employeeData.lastname, firstname: employeeData.firstname, fonction: employeeData.fonction };
                    await axios.post('/api/permis/edit-permi', {
                        payload: updatedValues, // Other values you're sending
                        permiId: selectedItemForEdit._id, // ID of the 'permi' you're updating
                        // Lastname from the selected employee
                    });

                    getPermis()
                    message.success('permi updated')
                }
                else {



                    await axios.post('/api/permis/add-permi', { ...values, image: image, firstname: selectedEmployee.firstname, lastname: selectedEmployee.lastname, fonction: selectedEmployee.fonction })
                    getPermis()
                    getEmps()
                    getEtablissements()
                    message.success('permi added')
                }
                setLoading(false);
                setShowAddEditPermiModal(false);
                setSelectedItemForEdit(null)

            } catch (error) {
                setLoading(false);
                message.error('wrong')

            }
        }




    }


    useEffect(() => {
        getEtablissements();
        console.log("Etablissements Data on Mount:", etablissementsData);
    }, []);
    useEffect(() => {
        getEmps();
        console.log("Emps Data on Mount:", empsData);
    }, []);

    return (

        <Modal title={selectedItemForEdit ? 'edit permi' : 'Add permi'} open={showAddEditPermiModal} onCancel={() => { setShowAddEditPermiModal(false); setSelectedItemForEdit(null) }} footer={false}>
            {loading && <Spinner />}

            <Form layout='vertical' className='permi-form' onFinish={onFinish} initialValues={selectedItemForEdit}>

                <Form.Item label='Cin' name='cin'>
                    {selectedItemForEdit ? (<Input type='text' disabled value={selectedItemForEdit.cin} />) : (<Select onChange={(value) => onValueChange(value)} >
                        {empsData && empsData.map((emp) => (
                            <Select.Option key={emp._id} value={emp.cin}>
                                {emp.cin}: {emp.firstname}
                            </Select.Option>

                        ))}

                    </Select>)}
                </Form.Item>


                {selectedItemForEdit ? (<Form.Item label={'firstname:     ' + (selectedItemForEdit.firstname)} name='firstname'>

                </Form.Item>) : (<Form.Item label={'firstname:     ' + (selectedEmployee ? selectedEmployee.firstname : '')} name='firstname'>

                </Form.Item>)}
                {selectedItemForEdit ? (<Form.Item label={'lastname:     ' + (selectedItemForEdit.lastname)} name='lastname'>

                </Form.Item>) : (<Form.Item label={'lastname:     ' + (selectedEmployee ? selectedEmployee.lastname : '')} name='lastname'>

                </Form.Item>)}
                {selectedItemForEdit ? (<Form.Item label={'fonction:     ' + (selectedItemForEdit.fonction)} name='fonction'>

                </Form.Item>) : (<Form.Item label={'fonction:     ' + (selectedEmployee ? selectedEmployee.fonction : '')} name='fonction'>

                </Form.Item>)}
                <Form.Item label='Num' name='num'  >
                    {selectedItemForEdit ? (
                        <Input type='text' disabled value={selectedItemForEdit.num} />
                    ) : (
                        <Input type='text' />
                    )}
                </Form.Item>

                <Form.Item label='Validite' name='validite'>
                    <Input type='date'>
                    </Input>
                </Form.Item>

                <Form.Item label='Image' name='image'  >
                    {selectedItemForEdit ? (
                        <Input type='text' disabled value={selectedItemForEdit.image} />
                    ) : (
                        <Input type='file' onChange={(e) => onImageChange(e)} />
                    )}
                </Form.Item>
                <Form.Item label='Etablissement' name='etablissement'>
                    <Select>
                        {etablissementsData && etablissementsData.map((etablissement) => (
                            <Select.Option key={etablissement._id} value={etablissement.name}>
                                {etablissement.name}
                            </Select.Option>
                        ))}

                    </Select>
                </Form.Item>

                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'> save</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditPermi
