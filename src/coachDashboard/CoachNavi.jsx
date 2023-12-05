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
                {isTrainer ? (
                    <>
                        <Menu.Item name='My Account' active={selectedNaviItem === 'Account'} onClick={onItemClick} />
                        <Menu.Item name='Clients' active={selectedNaviItem === 'Clients'} onClick={onItemClick} />
                    </>
                ) : null}
                {isTrainer && isClient ? (
                    <>
                        <Dropdown item text='Program' style={{ marginLeft: '50px' }}>
                            <Dropdown.Menu style={{ textAlign: 'center' }}>
                                <Dropdown.Item name='add Program' active={selectedNaviItem === 'add Program'} onClick={onItemClick} >Add Program</Dropdown.Item>
                                <Dropdown.Item name='update Program' active={selectedNaviItem === 'update Program'} onClick={onItemClick} >Update Program</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown item text='Nutrition Plan' style={{ marginLeft: '40px' }}>
                            <Dropdown.Menu style={{ textAlign: 'center' }}>
                                <Dropdown.Item name='add Nutrition Plan' active={selectedNaviItem === 'add Nutrition Plan'} onClick={onItemClick} >Add Nutrition Plan</Dropdown.Item>
                                <Dropdown.Item name='update Nutrition Plan' active={selectedNaviItem === 'update Nutrition Plan'} onClick={onItemClick} >Update Nutrition Plan</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item name='Progress Record' active={selectedNaviItem === 'Progress Record'} onClick={onItemClick} style={{ marginLeft: '15px' }}/>
                    </>
                ) : null}
            </Menu>
        </div>
    );
}
//                         <Menu.Item name='Program' active={selectedNaviItem === 'Program'} onClick={onItemClick} />
