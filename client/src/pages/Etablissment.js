import React, { useEffect, useState, navigate } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/etablissement.css';
import { Modal, Select, Table } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';
import AddEditEtablissement from '../components/AddEditEtablissement';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Etablissement() {
    const [showAddEditEtablissementModal, setShowAddEditEtablissementModal] = useState(false);
    const [etablissementsData, setEtablissementsData] = useState([]);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
    const getEtablissements = async () => {
        try {

            const response = await axios.get('/api/etablissements/get-all-etablissements')
            console.log(response.data)
            setEtablissementsData(response.data);

            //  message.success('fetching successful')


        } catch (error) {

            message.error('fetching  failed')

        }

    }

    const deleteEtablissements = async (record) => {
        try {

            const response = await axios.post('/api/etablissements/delete-etablissement', {
                etablissementId: record._id
            })



            message.success('delete successful')
            getEtablissements()


        } catch (error) {

            message.error('delete  failed')

        }

    }


    useEffect(() => {
        getEtablissements()
    }, [])
    const columns = [
        {
            title: "name",
            dataIndex: "name"
        },
        {
            title: "adresse",
            dataIndex: "adresse"
        },
        {
            title: "email",
            dataIndex: "email"
        }
        ,

        {
            title: "actions",
            dataIndex: "actions",
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setSelectedItemForEdit(record)
                        setShowAddEditEtablissementModal(true)
                    }} />
                    <DeleteOutlined className='mx-3' onClick={() => deleteEtablissements(record)} />
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
                    <button type="button" className='primary' onClick={() => setShowAddEditEtablissementModal(true)}>Add New</button>
                </div>
            </div>
            <div className='table-analtics'>
                <div className='table'>
                    <Table columns={columns} dataSource={etablissementsData} pagination={{
                        pageSize: 50,
                    }} />
                </div>
            </div>
            {showAddEditEtablissementModal && (<AddEditEtablissement
                showAddEditEtablissementModal={showAddEditEtablissementModal}
                setShowAddEditEtablissementModal={setShowAddEditEtablissementModal}
                selectedItemForEdit={selectedItemForEdit}
                getEtablissements={getEtablissements}
                setSelectedItemForEdit={setSelectedItemForEdit} />)}
        </DefaultLayout>

    );
}

export default Etablissement;
