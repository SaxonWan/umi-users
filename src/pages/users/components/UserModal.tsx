import React, { useEffect, FC } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { UserInfoType } from '../data.d';

interface UserModalType {
    visible: boolean,
    record: UserInfoType | undefined,
    onCancel: ()=>void,
    onFinish: (values: any)=>void,
};

const UserModal:FC<UserModalType> = (props) => {
    //props在这里具有只读的属性，不可以改变
    const { visible, record, onCancel, onFinish } = props;

    const [form] = Form.useForm();

    const setInitailValue = () => {
        if(record){
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
        
    };

    useEffect(setInitailValue,[visible]);
    
    return (
        <div>
            <Modal 
                title="Basic Modal" 
                visible={visible} 
                onOk={form.submit} 
                onCancel={onCancel}
                forceRender
            >
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Create Time"
                        name="create_time"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}

export default UserModal;