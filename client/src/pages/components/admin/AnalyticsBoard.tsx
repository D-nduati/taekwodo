// AnalyticsDashboard.tsx
import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';

interface AnalyticsProps {
  totalUsers: number;
  totalEvents: number;
  totalVideos: number;
}

const AnalyticsDashboard: React.FC<AnalyticsProps> = ({ totalUsers, totalEvents, totalVideos }) => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Users" value={totalUsers} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Total Events" value={totalEvents} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Total Videos" value={totalVideos} />
        </Card>
      </Col>
    </Row>
  );
};

export default AnalyticsDashboard;
