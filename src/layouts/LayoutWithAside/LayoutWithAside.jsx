import React from 'react';

import './LayoutWithAside.scss';
import { Divider } from 'antd';
import RealEstate from 'components/RealEstate/RealEstate';

const LayoutWithAside = props => {
  console.log(props);
  return (
    <div className="layout-aside">
      <div className="layout-aside_main">{props.children}</div>
      <aside className="layout-aside_aside">
        <h3>Nổi bật</h3>
        <Divider style={{ marginTop: 0 }} />
        <ul>
          {
            props.featured?.map((realEstate, index) => {
              return (
                <RealEstate thumbnail realEstate={realEstate} key={realEstate.id} />)
            })
          }
        </ul>
        <h3>Gần đây</h3>
        <Divider style={{ marginTop: 0 }} />
        <ul>
          {
            props.latest?.map((realEstate, index) => {
              return <RealEstate thumbnail realEstate={realEstate} key={realEstate.id} />
            })
          }
        </ul>
      </aside>
    </div>
  )
}

export default LayoutWithAside;