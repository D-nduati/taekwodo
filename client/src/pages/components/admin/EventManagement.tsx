import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';


interface Event {
  id: string; 
  eventName: string;
  eventDate: string;
  status: string;
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Event[]>('http://localhost:5000/admin/getevents');
      setEvents(response.data);
    } catch (error) {
      message.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (values: any) => {

    console.log(values)
    try {
      await axios.post('http://localhost:5000/admin/createEvents', {
        eventName: values.eventName,
        eventDate: values.eventDate,
      });
      message.success('Event added successfully');
      setIsEventModalVisible(false);
      fetchEvents(); 
    } catch (error) {
      console.log(error)
      message.error('Failed to add event ');
    }
  };

  
  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/admin/deleteEvents/${id}`);
      message.success('Event deleted successfully');
      fetchEvents(); 
    } catch (error) {
      message.error('Failed to delete event');
    }
  };

  return (
    <>
      <Table
        dataSource={events}
        columns={[
          { title: 'Event', dataIndex: 'eventName', key: 'eventName' },
          { title: 'Date', dataIndex: 'eventDate', key: 'eventDate' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record: Event) => (
              <Button type="link" danger onClick={() => handleDeleteEvent(record.id)}>
                Delete
              </Button>
            ),
          },
        ]}
        title={() => (
          <Button type="primary" onClick={() => setIsEventModalVisible(true)}>
            Add Event
          </Button>
        )}
        loading={loading}
      />

      <Modal
        title="Add New Event"
        open={isEventModalVisible}
        onCancel={() => setIsEventModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddEvent}>
          <Form.Item name="eventName" label="Event" rules={[{ required: true, message: 'Please enter an event' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="eventDate" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
            <Input type="date" />
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
