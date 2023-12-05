import React from 'react';
import { Menu } from 'semantic-ui-react';

export default function Navi({ onItemClick, selectedNaviItem }) {

  return (
    <div>
      <Menu size='small' vertical>
        <Menu.Item name='Add' active={selectedNaviItem === 'Add'} onClick={onItemClick} />
        <Menu.Item name='List' active={selectedNaviItem === 'Show'} onClick={onItemClick} />
      </Menu>
    </div>
  );
}