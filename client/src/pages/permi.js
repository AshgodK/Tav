import React, { useEffect, useState, navigate } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/permi.css';
import { Modal, Select, Table } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';
import AddEditPermi from '../components/AddEditPermi';
import PDFContent from './GenPdf';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';

import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

function Permi() {

    const styles = StyleSheet.create({
        // ... existing styles

        downloadButton: {
            textDecoration: 'none',
            color: '#FFFFFF',
            textAlign: 'center',
            // Customize the background color
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: 'transparent', // Customize the background color on hover
            },
        },

        // ... other styles
    });

    const [showAddEditPermiModal, setShowAddEditPermiModal] = useState(false);
    const [permisData, setPermisData] = useState([]);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)

    const [etablissementsData, setEtablissementsData] = useState([]);
    const [empsData, setEmpsData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    const getPermis = async () => {
        try {

            const response = await axios.get('/api/permis/get-all-permis')
            console.log(response.data)
            setPermisData(response.data);

            // message.success('fetching successful')


        } catch (error) {

            message.error('fetching  failed')

        }

    }

    const deletePermis = async (record) => {
        try {

            const response = await axios.post('/api/permis/delete-permi', {
                permiId: record._id
            })



            message.success('delete successful')
            getPermis()


        } catch (error) {

            message.error('delete  failed')

        }

    }

    const getEmpByCin = async (cinn) => {
        try {
            const response = await axios.get('/api/employees/get-employee-by-cin', {
                params: { cin: cinn },
            });
            const employeeData = response.data;
            setSelectedEmployee(prevEmployee => {
                // Using the state callback to ensure you're working with the latest state
                console.log(employeeData); // This will show the correct data
                return employeeData;
            });

            // setCurrentSelectedEmployee(employeeData);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };
    useEffect(() => {
        console.log(selectedEmployee);
    }, [selectedEmployee]);

    useEffect(() => {
        getPermis()
    }, [])
    const columns = [
        {
            title: "image",
            dataIndex: "image",
            render: (text, record) => {
                return <div>
                    <img
                        src={process.env.PUBLIC_URL + '/images/' + record.image}
                        alt="Selected"
                        width="70px"
                        height="70px"
                    />
                </div>
            }
        },
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
            title: "validite",
            dataIndex: "validite",
            render: (validite) => new Date(validite).toLocaleDateString('en-GB'),

        }
        ,
        {
            title: "etablissement",
            dataIndex: "etablissement"
        }
        ,
        {
            title: "num",
            dataIndex: "num"
        }
        ,
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


                        getEmpByCin(record.cin)
                        // console.log(selectedEmployee.cin)
                        setShowAddEditPermiModal(true)


                    }} />
                    <DeleteOutlined className='mx-3' onClick={() => deletePermis(record)} />


                    <PDFDownloadLink
                        document={<PDFContent permi={record} />} // Pass the user data to the PDFContent component
                        fileName="IdentityCard.pdf"
                        style={styles.downloadButton}
                    >
                        <DownloadOutlined style={{ fontSize: '16px' }} />
                    </PDFDownloadLink>
                </div>
            }
        },
        {
            title: "valid",

            render: (text, record) => {
                let erDate = "";
                var today = new Date();
                var Udate = new Date(record.validite);

                if (Udate < today) {
                    //Do something..
                    return <div>
                        <CloseOutlined style={{ fontSize: '16px', color: '#ff0000' }} />
                    </div>
                }
                else {
                    return <div>
                        <CheckOutlined style={{ fontSize: '16px', color: '#008000' }} />
                    </div>
                }


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
                    <button type="button" className='primary' onClick={() => setShowAddEditPermiModal(true)}>Add New</button>
                </div>
            </div>
            <div className='table-analtics'>
                <div className='table'>
                    <Table columns={columns} dataSource={permisData} pagination={{
                        pageSize: 4,
                    }} />
                </div>
            </div>
            {showAddEditPermiModal && (<AddEditPermi
                showAddEditPermiModal={showAddEditPermiModal}
                setShowAddEditPermiModal={setShowAddEditPermiModal}
                selectedItemForEdit={selectedItemForEdit}
                getPermis={getPermis}
                setSelectedItemForEdit={setSelectedItemForEdit}
                setEtablissementsData={setEtablissementsData}
                etablissementsData={etablissementsData}
                setEmpsData={setEmpsData}
                empsData={empsData}
            />)}
        </DefaultLayout>

    );
}

export default Permi;
