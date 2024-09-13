import React from 'react';
import { List, Card, Typography, Calendar } from 'antd';

const { Title } = Typography;

const trainingData = [
  { date: '2024-09-10', type: 'Sparring' },
  { date: '2024-09-12', type: 'Forms' },
  { date: '2024-09-15', type: 'Conditioning' },
];

const Training: React.FC = () => {
  return (
    <div className="training-page">
      <Title level={2}>Training Schedule</Title>
      <Card bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={trainingData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`Date: ${item.date}`}
                description={`Training Type: ${item.type}`}
              />
            </List.Item>
          )}
        />
      </Card>

      <Card title="Training Calendar" bordered={false} style={{ marginTop: 20 }}>
        <Calendar fullscreen={false} />
      </Card>
    </div>
  );
};

export default Training;
