import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message } from 'antd';
import axios from 'axios';

interface User {
  UserId: number;
  Username: string;
  Email: string;
  CreatedAt: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>('http://localhost:5000/admin/getusers'); 
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  interface AddUserFormValues {
    username: string;
    email: string;
    password: string;
  }

  const handleAddUser = async (values: AddUserFormValues) => {
    try {
      await axios.post('http://localhost:5000/admin/createNewUser', {
        username: values.username,
        email: values.email,
        password: values.password, 
      });
      message.success('User added successfully');
      setIsUserModalVisible(false);
      fetchUsers(); 
    } catch (error) {
      message.error('Failed to add user');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`http://localhost:5000/admin/deleteUser/${userId}`);
      message.success('User deleted successfully');
      fetchUsers(); 
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const userColumns = [
    { title: 'Name', dataIndex: 'Username', key: 'username' },
    { title: 'Email', dataIndex: 'Email', key: 'email' },
    { title: 'Created At', dataIndex: 'CreatedAt', key: 'createdAt' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Button type="link" danger onClick={() => handleDeleteUser(record.UserId)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsUserModalVisible(true)} style={{ marginBottom: 16 }}>
        Add User
      </Button>

      <Table columns={userColumns} dataSource={users} rowKey="UserId" loading={loading} />

   
      <Modal
        title="Add New User"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter a valid email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter a password' }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
