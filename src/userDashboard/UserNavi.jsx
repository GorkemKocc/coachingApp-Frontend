import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

export default function Navi({ onItemClick, selectedNaviItem }) {
    const location = useLocation();
    const isTrainer = location.pathname.startsWith('/trainer');
    const isClient = location.pathname.startsWith('/trainer/1/client/');

    return (

        <div>
            <Menu size='small' vertical>
                <Menu.Item name='My Account' active={selectedNaviItem === 'Account'} onClick={onItemClick} />
                <Menu.Item name='Nutrition Plans' active={selectedNaviItem === 'Nutrition'} onClick={onItemClick} />
                <Menu.Item name='Exercise Programs' active={selectedNaviItem === 'Exercise'} onClick={onItemClick} />
               
                <Dropdown item text='Progress Record' style={{ marginLeft: '29px' }}>
                    <Dropdown.Menu style={{ textAlign: 'center' }}>
                        <Dropdown.Item name='add Record' active={selectedNaviItem === 'add Record'} onClick={onItemClick} >Add Record</Dropdown.Item>
                        <Dropdown.Item name='update Record' active={selectedNaviItem === 'update Record'} onClick={onItemClick} >Update Record</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
    );
}
