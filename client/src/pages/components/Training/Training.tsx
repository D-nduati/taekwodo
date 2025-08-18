import React, { useEffect, useState } from 'react';
import { 
  List, 
  Card, 
  Calendar, 
  Layout, 
  Typography, 
  Row, 
  Col, 
  Avatar, 
  Tooltip, 
  message, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker,
  Badge,
  Progress,
  Divider,
  Popconfirm,
  Tag
} from 'antd';
import { 
  FireOutlined, 
  ThunderboltOutlined, 
  HeartOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  CheckCircleOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import moment, { Moment } from 'moment';

// import type { Dayjs } from 'dayjs';
// import { useNavigate } from 'react-router';
import { history } from 'umi';


const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface TrainingEvent {
  id: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  duration: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  instructor: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  participants?: string[];
}

const Training = () => {
  const [trainingSessions, setTrainingSessions] = useState<TrainingEvent[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TrainingEvent | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  // const navigate = useNavigate();
  

  useEffect(() => {
    fetchTrainingSessions();
  }, []);

  const fetchTrainingSessions = async () => {
    try {
      setLoading(true);
      const response = await axios.get<TrainingEvent[]>('http://localhost:5000/admin/getevents');
      setTrainingSessions(response.data);
    } catch (error) {
      message.error('Failed to fetch training sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditEvent = (event: TrainingEvent) => {
    setSelectedEvent(event);
    form.setFieldsValue({
      ...event,
      eventDate: dayjs(event.eventDate),
      eventTime: dayjs(event.eventTime, 'HH:mm')
    });
    setIsModalVisible(true);
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/admin/events/${id}`);
      message.success('Event deleted successfully');
      fetchTrainingSessions();
    } catch (error) {
      message.error('Failed to delete event');
    }
  };

  const handleJoinEvent = async (eventId: string) => {
    try {
      // In a real app, you would send the user ID along with the event ID
      await axios.post(`http://localhost:5000/events/${eventId}/join`, {
        userId: 'current-user-id' // Replace with actual user ID
      });
      message.success('Successfully joined the training session!');
      fetchTrainingSessions();
    } catch (error) {
      message.error('Failed to join the session');
    }
  };

  const handleCompleteEvent = async (eventId: string) => {
    try {
      await axios.patch(`http://localhost:5000/admin/events/${eventId}`, {
        status: 'Completed'
      });
      message.success('Event marked as completed');
      fetchTrainingSessions();
    } catch (error) {
      message.error('Failed to update event status');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        eventDate: values.eventDate.format('YYYY-MM-DD'),
        eventTime: values.eventTime.format('HH:mm'),
        status: 'Scheduled'
      };

      if (selectedEvent) {
        await axios.put(`http://localhost:5000/admin/events/${selectedEvent.id}`, formattedValues);
        message.success('Event updated successfully');
      } else {
        await axios.post('http://localhost:5000/admin/events', formattedValues);
        message.success('Event created successfully');
      }

      setIsModalVisible(false);
      fetchTrainingSessions();
    } catch (error) {
      message.error(selectedEvent ? 'Failed to update event' : 'Failed to create event');
    }
  };

  const motivationalQuotes = [
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't limit your challenges. Challenge your limits.",
    "Push yourself, because no one else is going to do it for you.",
    "Success starts with self-discipline.",
    "The only bad workout is the one that didn't happen."
  ];

  const trainingTips = [
    {
      title: "Stay Hydrated",
      icon: <ThunderboltOutlined style={{ fontSize: '36px', color: '#1890ff' }} />,
      content: "Keep yourself hydrated before, during, and after training. Water fuels your muscles and keeps you energized.",
      color: '#e6f7ff'
    },
    {
      title: "Stretch and Warm-Up",
      icon: <FireOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />,
      content: "Properly warm up your body before engaging in intense training to prevent injuries and improve performance.",
      color: '#fff1f0'
    },
    {
      title: "Focus on Technique",
      icon: <HeartOutlined style={{ fontSize: '36px', color: '#52c41a' }} />,
      content: "Always pay attention to your form and technique during training. Precision leads to mastery.",
      color: '#f6ffed'
    }
  ];

  const iconMap: Record<string, React.ReactElement> = {
    Sparring: <FireOutlined style={{ color: '#ff4d4f' }} />,
    Forms: <ThunderboltOutlined style={{ color: '#1890ff' }} />,
    Conditioning: <HeartOutlined style={{ color: '#52c41a' }} />,
  };

  const difficultyColors: Record<string, string> = {
    Beginner: 'green',
    Intermediate: 'orange',
    Advanced: 'red'
  };

  const getFilteredEvents = () => {
    switch (activeTab) {
      case 'upcoming':
        return trainingSessions.filter(event => event.status === 'Scheduled');
      case 'completed':
        return trainingSessions.filter(event => event.status === 'Completed');
      case 'cancelled':
        return trainingSessions.filter(event => event.status === 'Cancelled');
      default:
        return trainingSessions;
    }
  };


  const dateCellRender = (date: Moment) => {
    const eventsOnDate = trainingSessions.filter(event => 
      moment(event.eventDate).isSame(date, 'day')
    );
  
    return (
      <div style={{ minHeight: '60px' }}>
        {eventsOnDate.map(event => (
          <div key={event.id} style={{ marginBottom: 2 }}>
            <Badge 
              status="processing" 
              color={event.status === 'Completed' ? 'green' : event.status === 'Cancelled' ? 'gray' : 'blue'}
              text={
                <Tooltip title={`${event.eventName} at ${event.eventTime}`}>
                  <span style={{ fontSize: 10 }}>
                    {event.eventName.substring(0, 10)}{event.eventName.length > 10 ? '...' : ''}
                  </span>
                </Tooltip>
              }
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '50px 20px' }}>
      <Content style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Title */}
        <Title level={3} style={{ textAlign: 'center', marginBottom: '40px', color: '#001529' }}>
          Taekwondo Training Management
        </Title>

        {/* Action Buttons */}
        <div style={{ textAlign: 'right', marginBottom: 20 }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateEvent}
            style={{ marginRight: 8 }}
          >
            Create Event
          </Button>
          <Button 
            onClick={() => history.push('/training/progress')}
            icon={<StarOutlined />}
          >
            View My Progress
          </Button>
        </div>

        <Row gutter={32}>
          {/* Training List */}
          <Col xs={24} md={12}>
            <Card
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Training Sessions</span>
                  <Select 
                    defaultValue="upcoming" 
                    style={{ width: 120 }} 
                    onChange={setActiveTab}
                  >
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                </div>
              }
              bordered={false}
              loading={loading}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <List
                itemLayout="horizontal"
                dataSource={getFilteredEvents()}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      activeTab === 'upcoming' && (
                        <>
                          <Button 
                            type="link" 
                            icon={<EditOutlined />} 
                            onClick={() => handleEditEvent(item)}
                          />
                          <Popconfirm
                            title="Are you sure to delete this event?"
                            onConfirm={() => handleDeleteEvent(item.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link" danger icon={<DeleteOutlined />} />
                          </Popconfirm>
                          <Button 
                            type="primary" 
                            size="small"
                            onClick={() => handleJoinEvent(item.id)}
                          >
                            Join
                          </Button>
                        </>
                      ),
                      activeTab === 'upcoming' && item.instructor === 'current-user' && (
                        <Button 
                          type="default" 
                          icon={<CheckCircleOutlined />}
                          onClick={() => handleCompleteEvent(item.id)}
                        >
                          Complete
                        </Button>
                      )
                    ].filter(Boolean)}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={iconMap[item.eventName] || <FireOutlined />} />}
                      title={
                        <div>
                          <Text strong>{item.eventName}</Text>
                          <Tag 
                            color={difficultyColors[item.difficulty]} 
                            style={{ marginLeft: 8 }}
                          >
                            {item.difficulty}
                          </Tag>
                        </div>
                      }
                      description={
                        <div>
                          <div>{`Date: ${item.eventDate} at ${item.eventTime}`}</div>
                          <div>{`Duration: ${item.duration} minutes`}</div>
                          <div>{`Instructor: ${item.instructor}`}</div>
                          {item.participants && item.participants.length > 0 && (
                            <div>
                              <TeamOutlined style={{ marginRight: 4 }} />
                              {`${item.participants.length} participants`}
                            </div>
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Progress Tracking */}
            <Card
              title="Your Training Progress"
              bordered={false}
              style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Text strong>Sessions Attended This Month</Text>
                <Progress 
                  percent={75} 
                  status="active" 
                  style={{ marginTop: 8 }}
                />
              </div>
              <div>
                <Text strong>Next Belt Requirements</Text>
                <Progress 
                  percent={60} 
                  format={() => '6/10 sessions completed'}
                  style={{ marginTop: 8 }}
                />
              </div>
            </Card>

            {/* Motivational Quotes Section */}
            <Card
              title="Motivational Quotes"
              bordered={false}
              style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {motivationalQuotes.map((quote, index) => (
                <Text
                  key={index}
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontStyle: 'italic',
                    color: '#001529',
                  }}
                >
                  {`"${quote}"`}
                </Text>
              ))}
            </Card>
          </Col>

          {/* Training Calendar */}
          <Col xs={24} md={12}>
            <Card
              title="Training Calendar"
              bordered={false}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Calendar 
                fullscreen={false} 
                style={{ borderRadius: '12px' }} 
                dateCellRender={dateCellRender}
              />
            </Card>

            {/* Upcoming Events Summary */}
            <Card
              title="Upcoming Sessions Summary"
              bordered={false}
              style={{
                marginTop: '20px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {trainingSessions
                .filter(event => event.status === 'Scheduled')
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} style={{ marginBottom: 16 }}>
                    <Text strong>{event.eventName}</Text>
                    <div>{dayjs(`${event.eventDate} ${event.eventTime}`).format('MMM D, YYYY h:mm A')}</div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <UserOutlined style={{ marginRight: 4 }} />
                      <Text type="secondary">{event.instructor}</Text>
                    </div>
                    <Divider style={{ margin: '12px 0' }} />
                  </div>
                ))}
              <Button type="link" onClick={() => setActiveTab('upcoming')}>
                View All Upcoming Sessions
              </Button>
            </Card>

            {/* Preparation Tips */}
            <Title
              level={4}
              style={{ marginTop: '20px', color: '#001529',textAlign: 'center', fontWeight: 'bold' }}
            >
              Preparation Tips for Your Next Session
            </Title>
            <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
              {trainingTips.map((tip, index) => (
                <Col xs={24} key={index}>
                  <Card
                    bordered={false}
                    style={{
                      backgroundColor: tip.color,
                      borderRadius: '12px',
                      padding: '15px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: 15 }}>
                        {tip.icon}
                      </div>
                      <div>
                        <Text strong style={{ display: 'block' }}>{tip.title}</Text>
                        <Paragraph style={{ marginBottom: 0 }}>{tip.content}</Paragraph>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Content>

      {/* Event Creation/Edit Modal */}
      <Modal
        title={selectedEvent ? 'Edit Training Event' : 'Create New Training Event'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={loading}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            difficulty: 'Intermediate',
            duration: 60
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="eventName"
                label="Event Name"
                rules={[{ required: true, message: 'Please enter event name' }]}
              >
                <Select placeholder="Select training type">
                  <Option value="Sparring">Sparring</Option>
                  <Option value="Forms">Forms (Poomsae)</Option>
                  <Option value="Conditioning">Conditioning</Option>
                  <Option value="Self-Defense">Self-Defense</Option>
                  <Option value="Special Techniques">Special Techniques</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="difficulty"
                label="Difficulty Level"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Beginner">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="eventDate"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="eventTime"
                label="Time"
                rules={[{ required: true, message: 'Please select time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Duration (minutes)"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[{ required: true, message: 'Please enter instructor name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Additional Notes"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Training;
// import React, { useEffect, useState } from 'react';
// import { List, Card, Calendar, Layout, Typography, Row, Col, Avatar, Tooltip, message } from 'antd';
// import { FireOutlined, ThunderboltOutlined, HeartOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Content } = Layout;
// const { Title, Text, Paragraph } = Typography;

// interface TrainingEvent {
//   eventName: string;
//   eventDate: string;
//   status: string;
// }


// const Training = () => {
//   const [trainingSessions, setTrainingSessions] = useState<TrainingEvent[]>([]);

//   useEffect(() => {
//     fetchTrainingSessions();
//   }, []);

//   const fetchTrainingSessions = async () => {
//     try {
//       const response = await axios.get<TrainingEvent[]>('http://localhost:5000/admin/getevents');
//       setTrainingSessions(response.data.filter(event => event.status === 'Scheduled')); // Only fetch scheduled events
//     } catch (error) {
//       message.error('Failed to fetch training sessions');
//     }
//   };

//   const motivationalQuotes = [
//     "The pain you feel today will be the strength you feel tomorrow.",
//     "Don’t limit your challenges. Challenge your limits.",
//     "Push yourself, because no one else is going to do it for you.",
//   ];

//   // const iconMap = {
//   //   Sparring: <FireOutlined style={{ color: '#ff4d4f' }} />,
//   //   Forms: <ThunderboltOutlined style={{ color: '#1890ff' }} />,
//   //   Conditioning: <HeartOutlined style={{ color: '#52c41a' }} />,
//   // };
//   const iconMap: Record<string, React.ReactElement> = {
//     Sparring: <FireOutlined style={{ color: '#ff4d4f' }} />,
//     Forms: <ThunderboltOutlined style={{ color: '#1890ff' }} />,
//     Conditioning: <HeartOutlined style={{ color: '#52c41a' }} />,
//   };

//   return (
//     <Layout style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '50px 20px' }}>
//       <Content style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Section Title */}
//         <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', color: '#001529' }}>
//           Upcoming Taekwondo Training Sessions
//         </Title>

//         <Row gutter={32}>
//           {/* Training List */}
//           <Col xs={24} md={12}>
//             <Card
//               title="Training Schedule"
//               bordered={false}
//               style={{
//                 backgroundColor: '#fff',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <List
//                 itemLayout="horizontal"
//                 dataSource={trainingSessions}
//                 renderItem={(item) => (
//                   <List.Item>
//                     <List.Item.Meta
//                       avatar={<Avatar icon={iconMap[item.eventName] || <FireOutlined />} />} // Fallback to FireOutlined
//                       title={<Text strong>{`Date: ${item.eventDate}`}</Text>}
//                       description={<Text>{`Training Type: ${item.eventName}`}</Text>}
//                     />
//                   </List.Item>
//                 )}
//               />
//             </Card>

//             {/* Motivational Quotes Section */}
//             <Card
//               title="Motivational Quotes"
//               bordered={false}
//               style={{
//                 marginTop: '20px',
//                 backgroundColor: '#fff',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               {motivationalQuotes.map((quote, index) => (
//                 <Text
//                   key={index}
//                   style={{
//                     display: 'block',
//                     marginBottom: '10px',
//                     fontStyle: 'italic',
//                     color: '#001529',
//                   }}
//                 >
//                   {`"${quote}"`}
//                 </Text>
//               ))}
//             </Card>
//           </Col>

//           {/* Training Calendar */}
//           <Col xs={24} md={12}>
//             <Card
//               title="Training Calendar"
//               bordered={false}
//               style={{
//                 backgroundColor: '#fff',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               }}
//             >
//               <Calendar fullscreen={false} style={{ borderRadius: '12px' }} />
//             </Card>
//           </Col>
//           <Title
//             level={3}
//             style={{ marginTop: '50px', textAlign: 'center', color: '#001529', fontWeight: 'bold' }}
//           >
//             Preparation Tips for Your Next Session
//           </Title>
//           <Row gutter={[32, 32]} justify="center" style={{ marginTop: '20px' }}>
//             <Col xs={24} sm={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   backgroundColor: '#e6f7ff',
//                   textAlign: 'center',
//                   borderRadius: '12px',
//                   padding: '20px',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 }}
//               >
//                 <Tooltip title="Stay Hydrated" color="#1890ff">
//                   <ThunderboltOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
//                 </Tooltip>
//                 <Text style={{ display: 'block', marginTop: '10px' }}>Stay Hydrated</Text>
//                 <Paragraph>
//                   Keep yourself hydrated before, during, and after training. Water fuels your muscles and keeps you
//                   energized.
//                 </Paragraph>
//               </Card>
//             </Col>
//             <Col xs={24} sm={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   backgroundColor: '#fff1f0',
//                   textAlign: 'center',
//                   borderRadius: '12px',
//                   padding: '20px',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 }}
//               >
//                 <Tooltip title="Stretch and Warm-Up" color="#ff4d4f">
//                   <FireOutlined style={{ fontSize: '36px', color: '#ff4d4f' }} />
//                 </Tooltip>
//                 <Text style={{ display: 'block', marginTop: '10px' }}>Stretch & Warm-Up</Text>
//                 <Paragraph>
//                   Properly warm up your body before engaging in intense training to prevent injuries and improve
//                   performance.
//                 </Paragraph>
//               </Card>
//             </Col>
//             <Col xs={24} sm={8}>
//               <Card
//                 bordered={false}
//                 style={{
//                   backgroundColor: '#f6ffed',
//                   textAlign: 'center',
//                   borderRadius: '12px',
//                   padding: '20px',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                 }}
//               >
//                 <Tooltip title="Focus on Technique" color="#52c41a">
//                   <HeartOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
//                 </Tooltip>
//                 <Text style={{ display: 'block', marginTop: '10px' }}>Focus on Technique</Text>
//                 <Paragraph>
//                   Always pay attention to your form and technique during training. Precision leads to mastery.
//                 </Paragraph>
//               </Card>
//             </Col>
//           </Row>
//         </Row>
//       </Content>
//     </Layout>
//   );
// };

// export default Training;
