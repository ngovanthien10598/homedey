import React from 'react';
import { Card } from 'antd';

import './Project.scss';
import { Link } from 'react-router-dom';

const Project = props => {
  return (
    <Link to="/project/slug">
      <Card
        className="project"
        hoverable
        cover={<img src="//via.placeholder.com/400x300" alt="cover" />}>
        <Card.Meta title={<h3>Tên dự án</h3>} />
        <div className="project_content">
          <div className="project_price">Giá</div>
          <div className="project_city">Tỉnh/TP</div>
        </div>
      </Card>
    </Link>
  )
}

export default Project;