// EventManagement.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const initialEvents = [
  { key: '1', event: 'Belt Test', date: '2024-09-10', status: 'Scheduled' },
  { key: '2', event: 'Sparring Tournament', date: '2024-10-15', status: 'Completed' },
];

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);

  const handleAddEvent = (values: any) => {
    const newEvent = {
      key: Math.random().toString(36).substr(2, 9),
      event: values.event,
      date: values.date,
      status: 'Scheduled',
    };
    setEvents([...events, newEvent]);
    setIsEventModalVisible(false);
    message.success('Event added successfully');
  };

  return (
    <>
      <Table
        dataSource={events}
        columns={[
          { title: 'Event', dataIndex: 'event', key: 'event' },
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
        ]}
        title={() => (
          <Button type="primary" onClick={() => setIsEventModalVisible(true)}>
            Add Event
          </Button>
        )}
      />

      <Modal
        title="Add New Event"
        visible={isEventModalVisible}
        onCancel={() => setIsEventModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddEvent}>
          <Form.Item name="event" label="Event" rules={[{ required: true, message: 'Please enter an event' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Event
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EventManagement;
