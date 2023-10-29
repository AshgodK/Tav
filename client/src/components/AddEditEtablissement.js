import axios from 'axios'
import Spinner from '../components/spinner'
import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import Form from 'antd/es/form/Form';
import { Button, Input, message } from 'antd';

function AddEditEtablissement({ showAddEditEtablissementModal, setShowAddEditEtablissementModal, selectedItemForEdit, getEtablissements, setSelectedItemForEdit }) {

    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (selectedItemForEdit) {
                await axios.post('/api/etablissements/edit-etablissement', { payload: { ...values }, etablissementId: selectedItemForEdit._id })
                getEtablissements()
                message.success('etablissement updated')
            }
            else {
                await axios.post('/api/etablissements/add-etablissement', values)
                getEtablissements()
                message.success('etablissement added')
            }
            setLoading(false);
            setShowAddEditEtablissementModal(false);
            setSelectedItemForEdit(null)

        } catch (error) {
            setLoading(false);
            message.error('wrong')

        }

    }
    return (

        <Modal title={selectedItemForEdit ? 'edit etablissement' : 'Add etablissement'} open={showAddEditEtablissementModal} onCancel={() => setShowAddEditEtablissementModal(false)} footer={false}>
            {loading && <Spinner />}
            <Form layout='vertical' className='etablissement-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label='name' name='name'>
                    <Input type='text'>
                    </Input>
                </Form.Item>
                <Form.Item label='adresse' name='adresse'>
                    <Input type='text'>
                    </Input>
                </Form.Item>
                <Form.Item label='email' name='email'>
                    <Input type='text'>
                    </Input>
                </Form.Item>


                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'> save</button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddEditEtablissement
