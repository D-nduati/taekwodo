import React, { useEffect, useState } from 'react';
import { Table, Typography, Layout, Card, Tag, Progress, Row, Col, Avatar } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface RankingData {
  key: string;
  rank: number;
  username: string;
  avatarUrl: string;
  score: number;
  progress: number;
}

const Rankings: React.FC = () => {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('/api/rankings'); 
        const formattedData = response.data.map((item: any) => ({
          key: item.UserId,
          rank: item.Rank,
          username: item.Username,
          avatarUrl: item.AvatarUrl,
          score: item.Score,
          progress: Math.min(item.Score, 100), 
        }));
        setRankingData(formattedData);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => (
        <div style={{ fontWeight: 'bold' }}>
          {rank}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      render: (username: string, record: RankingData) => (
        <div>
          <Avatar src={record.avatarUrl} />{' '}
          <Text style={{ fontWeight: 'bold', color: '#001529' }}>{username}</Text>
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Tag color={score > 90 ? 'green' : 'orange'}>{score}</Tag>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} status={progress > 85 ? 'active' : 'normal'} />,
    },
  ];

  return (
    <Layout style={{ padding: '50px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Row justify="center">
        <Col xs={24} sm={16}>
          <Title level={2} style={{ textAlign: 'center', color: '#001529', marginBottom: '30px' }}>
            Taekwondo Rankings
          </Title>

          <Card
            bordered={false}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              marginBottom: '40px',
              backgroundColor: '#fff',
            }}
          >
            <Table dataSource={rankingData} columns={columns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Rankings;


// import React, { useEffect, useState } from 'react';
// import { Table, Typography, Layout, Card, Avatar, Tag, Progress, Row, Col } from 'antd';
// import { TrophyOutlined, StarOutlined, FireOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Title, Text } = Typography;

// const Rankings: React.FC = () => {
//   const [rankingData, setRankingData] = useState([]);

//   useEffect(() => {
//     const fetchRankings = async () => {
//       try {
//         const response = await axios.get('/api/rankings'); // Adjust API path if necessary
//         setRankingData(response.data);
//       } catch (error) {
//         console.error('Error fetching rankings:', error);
//       }
//     };

//     fetchRankings();
//   }, []);

//   const columns = [
//     {
//       title: 'Rank',
//       dataIndex: 'rank',
//       key: 'rank',
//       render: (rank: number) => (
//         <div style={{ fontWeight: 'bold' }}>
//           {rank === 1 ? <TrophyOutlined style={{ color: '#fadb14' }} /> : null}
//           {rank}
//         </div>
//       ),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'username',
//       key: 'username',
//       render: (name: string) => <Text style={{ fontWeight: 'bold', color: '#001529' }}>{name}</Text>,
//     },
//     {
//       title: 'Score',
//       dataIndex: 'score',
//       key: 'score',
//       render: (score: number) => <Tag color={score > 90 ? 'green' : 'orange'}>{score}</Tag>,
//     },
//     {
//       title: 'Progress',
//       dataIndex: 'progress',
//       key: 'progress',
//       render: (progress: number) => <Progress percent={progress} status={progress > 85 ? 'active' : 'normal'} />,
//     },
//   ];

//   return (
//     <Layout style={{ padding: '50px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
//       <Row justify="center">
//         <Col xs={24} sm={16}>
//           <Title level={2} style={{ textAlign: 'center', color: '#001529', marginBottom: '30px' }}>
//             Taekwondo Rankings
//           </Title>

//           <Card
//             bordered={false}
//             style={{
//               borderRadius: '12px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               marginBottom: '40px',
//               backgroundColor: '#fff',
//             }}
//           >
//             <Table
//               dataSource={rankingData}
//               columns={columns}
//               pagination={false}
//               rowClassName={(record) =>
//                 record.rank === 1 ? 'top-rank-row' : record.rank === 2 ? 'second-rank-row' : 'third-rank-row'
//               }
//             />
//           </Card>
//         </Col>
//       </Row>
//     </Layout>
//   );
// };

// export default Rankings;


// import React, { useEffect, useState } from 'react';
// import { Table, Typography, Layout, Card, Avatar, Tag, Progress, Row, Col, message } from 'antd';
// import { TrophyOutlined, StarOutlined, FireOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Title, Text } = Typography;

// // Define an interface for the ranking data from the backend
// interface RankingData {
//   key: string;
//   rank: number;
//   name: string;
//   score: number;
//   progress: number;
//   icon: JSX.Element;
//   userId: string; // Add userId to track specific users
// }

// const Rankings: React.FC = () => {
//   const [rankingData, setRankingData] = useState<RankingData[]>([]);

//   // Fetch rankings from the server
//   useEffect(() => {
//     const fetchRankings = async () => {
//       try {
//         const response = await axios.get<RankingData[]>('http://localhost:5000/api/rankings'); // Update with your endpoint
//         const data = response.data.map((item, index) => ({
//           ...item,
//           icon:
//             index === 0 ? (
//               <TrophyOutlined style={{ color: '#fadb14' }} />
//             ) : index === 1 ? (
//               <StarOutlined style={{ color: '#1890ff' }} />
//             ) : (
//               <FireOutlined style={{ color: '#ff4d4f' }} />
//             ),
//         }));
//         setRankingData(data);
//       } catch (error) {
//         message.error('Failed to fetch rankings');
//       }
//     };

//     fetchRankings();
//   }, []);

//   // Define columns for the table
//   const columns = [
//     {
//       title: 'Rank',
//       dataIndex: 'rank',
//       key: 'rank',
//       render: (rank: number, record: RankingData) => (
//         <div style={{ fontWeight: 'bold' }}>
//           {record.icon} {rank}
//         </div>
//       ),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (name: string) => <Text style={{ fontWeight: 'bold', color: '#001529' }}>{name}</Text>,
//     },
//     {
//       title: 'Score',
//       dataIndex: 'score',
//       key: 'score',
//       render: (score: number) => <Tag color={score > 90 ? 'green' : 'orange'}>{score}</Tag>,
//     },
//     {
//       title: 'Progress',
//       dataIndex: 'progress',
//       key: 'progress',
//       render: (progress: number) => <Progress percent={progress} status={progress > 85 ? 'active' : 'normal'} />,
//     },
//   ];

//   return (
//     <Layout style={{ padding: '50px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
//       <Row justify="center">
//         <Col xs={24} sm={16}>
//           <Title level={2} style={{ textAlign: 'center', color: '#001529', marginBottom: '30px' }}>
//             Taekwondo Rankings
//           </Title>

//           {/* Rankings Table */}
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: '12px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               marginBottom: '40px',
//               backgroundColor: '#fff',
//             }}
//           >
//             <Table
//               dataSource={rankingData}
//               columns={columns}
//               pagination={false}
//               rowClassName={(record) =>
//                 record.rank === 1 ? 'top-rank-row' : record.rank === 2 ? 'second-rank-row' : 'third-rank-row'
//               }
//             />
//           </Card>

//           {/* Motivational Section */}
//           <Card
//             title="Stay Motivated!"
//             bordered={false}
//             style={{
//               borderRadius: '12px',
//               backgroundColor: '#e6f7ff',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Text style={{ fontStyle: 'italic', fontSize: '16px', color: '#001529' }}>
//               "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love
//               of what you are doing." – Pele
//             </Text>
//           </Card>
//         </Col>
//       </Row>
//     </Layout>
//   );
// };

// export default Rankings;


// import React from 'react';
// import { Table, Typography, Layout, Card, Avatar, Tag, Progress, Row, Col } from 'antd';
// import { TrophyOutlined, StarOutlined, FireOutlined } from '@ant-design/icons';

// const { Title, Text } = Typography;

// // Define an interface for the ranking data
// interface RankingData {
//   key: string;
//   rank: number;
//   name: string;
//   score: number;
//   progress: number;
//   icon: JSX.Element;
// }

// const rankingData: RankingData[] = [
//   { key: '1', rank: 1, name: 'John Doe', score: 95, progress: 90, icon: <TrophyOutlined style={{ color: '#fadb14' }} /> },
//   { key: '2', rank: 2, name: 'Jane Smith', score: 90, progress: 85, icon: <StarOutlined style={{ color: '#1890ff' }} /> },
//   { key: '3', rank: 3, name: 'Sam Kim', score: 85, progress: 80, icon: <FireOutlined style={{ color: '#ff4d4f' }} /> },
// ];

// // Define types for the columns
// const columns = [
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     key: 'rank',
//     render: (rank: number, record: RankingData) => (
//       <div style={{ fontWeight: 'bold' }}>
//         {record.icon} {rank}
//       </div>
//     ),
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     render: (name: string) => <Text style={{ fontWeight: 'bold', color: '#001529' }}>{name}</Text>,
//   },
//   {
//     title: 'Score',
//     dataIndex: 'score',
//     key: 'score',
//     render: (score: number) => <Tag color={score > 90 ? 'green' : 'orange'}>{score}</Tag>,
//   },
//   {
//     title: 'Progress',
//     dataIndex: 'progress',
//     key: 'progress',
//     render: (progress: number) => <Progress percent={progress} status={progress > 85 ? 'active' : 'normal'} />,
//   },
// ];

// const Rankings: React.FC = () => {
//   return (
//     <Layout style={{ padding: '50px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
//       <Row justify="center">
//         <Col xs={24} sm={16}>
//           <Title level={2} style={{ textAlign: 'center', color: '#001529', marginBottom: '30px' }}>
//             Taekwondo Rankings
//           </Title>

//           {/* Rankings Table */}
//           <Card
//             bordered={false}
//             style={{
//               borderRadius: '12px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               marginBottom: '40px',
//               backgroundColor: '#fff',
//             }}
//           >
//             <Table
//               dataSource={rankingData}
//               columns={columns}
//               pagination={false}
//               rowClassName={(record) =>
//                 record.rank === 1 ? 'top-rank-row' : record.rank === 2 ? 'second-rank-row' : 'third-rank-row'
//               }
//             />
//           </Card>

//           {/* Motivational Section */}
//           <Card
//             title="Stay Motivated!"
//             bordered={false}
//             style={{
//               borderRadius: '12px',
//               backgroundColor: '#e6f7ff',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             <Text style={{ fontStyle: 'italic', fontSize: '16px', color: '#001529' }}>
//               "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love
//               of what you are doing." – Pele
//             </Text>
//           </Card>
//         </Col>
//       </Row>
//     </Layout>
//   );
// };

// export default Rankings;
