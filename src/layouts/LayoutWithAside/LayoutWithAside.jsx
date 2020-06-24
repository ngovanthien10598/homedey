import React from 'react';

import './LayoutWithAside.scss';
import { Divider } from 'antd';
import RealEstate from 'components/RealEstate/RealEstate';

const LayoutWithAside = props => {
  return (
    <div className="layout-aside">
      <div className="layout-aside_main">{props.children}</div>
      <aside className="layout-aside_aside">
        <h3>Nổi bật</h3>
        <Divider style={{marginTop: 0}} />
        <div>
          {
            Array(3).fill().map((_, index) => {
              return <RealEstate thumbnail key={index} />
            })
          }
        </div>
        <h3>Gần đây</h3>
        <Divider style={{marginTop: 0}}/>
        <div>
          {
            Array(3).fill().map((_, index) => {
              return <RealEstate thumbnail key={index} />
            })
          }
        </div>
      </aside>
    </div>
  )
}

export default LayoutWithAside;