// UserManagement.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const initialUsers = [
  { key: '1', name: 'John Doe', role: 'Instructor', email: 'john@example.com' },
  { key: '2', name: 'Jane Smith', role: 'Student', email: 'jane@example.com' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  const handleDeleteUser = (key: string) => {
    setUsers(users.filter(user => user.key !== key));
    message.success('User deleted successfully');
  };

  const handleAddUser = (values: any) => {
    const newUser = {
      key: Math.random().toString(36).substr(2, 9),
      name: values.name,
      role: values.role,
      email: values.email,
    };
    setUsers([...users, newUser]);
    setIsUserModalVisible(false);
    message.success('User added successfully');
  };

  return (
    <>
      <Table
        dataSource={users}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Role', dataIndex: 'role', key: 'role' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Button type="link" danger onClick={() => handleDeleteUser(record.key)}>
                Delete
              </Button>
            ),
          },
        ]}
        title={() => (
          <Button type="primary" onClick={() => setIsUserModalVisible(true)}>
            Add User
          </Button>
        )}
      />

      <Modal
        title="Add New User"
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter a valid email' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add User
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserManagement;
