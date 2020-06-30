import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import './Project.scss';
import { getShortAddressString } from 'utils/string';
import { priceWithThousandSpace } from 'utils/number';

const Project = props => {
  const { project } = props;
  const { name, price, address, images, slug } = project;
  return (
    <Card
      className={`project${props.thumbnail ? ' project--thumbnail' : ''}`}
      bordered={!props.thumbnail}
      cover={<Link className="project_link" to={`/project/${slug}`} title={name}>
        <img src={images[0]?.url || "//via.placeholder.com/800x600"} alt={images[0]?.url || "//via.placeholder.com/800x600"} />
      </Link>}>
      <Card.Meta title={
        <h3><small>
          <Link className="project_link" to={`/project/{slug}`} title={name}>
            {name}
          </Link>
        </small></h3>
      } />
      {
        !props.thumbnail &&
        <div className="project_content">
          <div className="project_price">{priceWithThousandSpace(price) + " VND" || "Đang cập nhật"}</div>
          <div className="project_city">{getShortAddressString(address)}</div>
        </div>
      }
    </Card>
  )
}

export default Project;