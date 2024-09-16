import React from 'react';
import { Table, Typography,  Layout,Card } from 'antd';


const { Title } = Typography;


const rankingData = [
  { key: '1', rank: 1, name: 'John Doe', score: 95 },
  { key: '2', rank: 2, name: 'Jane Smith', score: 90 },
  { key: '3', rank: 3, name: 'Sam Kim', score: 85 },
];

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
];

const Rankings: React.FC = () => {
  return (
    <div className="rankings-page">
      <Title level={2}>Taekwondo Rankings</Title>
      <Card bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
        <Table dataSource={rankingData} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default Rankings;
