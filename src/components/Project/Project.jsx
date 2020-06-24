import React from 'react';
import { Card } from 'antd';

import './Project.scss';
import { Link } from 'react-router-dom';

const Project = props => {
  return (
    <Card
      className={`project${props.thumbnail ? ' project--thumbnail' : ''}`}
      bordered={!props.thumbnail}
      cover={<Link className="project_link" to="/project/slug" title="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
        <img src="//via.placeholder.com/800x600" alt="cover" />
      </Link>}>
      <Card.Meta title={
        <h3><small>
          <Link className="project_link" to="/project/slug" title="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Link>
        </small></h3>
      } />
      {
        !props.thumbnail &&
        <div className="project_content">
          <div className="project_price">Giá</div>
          <div className="project_city">Tỉnh/TP</div>
        </div>
      }
    </Card>
  )
}

export default Project;