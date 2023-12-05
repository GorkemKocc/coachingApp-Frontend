import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';

export default function TopBar({ onItemClick, selectedMenuItem }) {
  const navigate = useNavigate()
  const logOut = () => {
    navigate("/")
}
  return (
    <div>
      <Menu size='large' inverted>
        <Container>
          <Menu.Item as={NavLink} to="/admin/coach" name='Coach' active={selectedMenuItem === 'Coach'} onClick={onItemClick}
          />
          <Menu.Item as={NavLink} to="/admin/user" name='User' active={selectedMenuItem === 'User'} onClick={onItemClick}
          />
          <Menu.Menu position='right'>
            <Dropdown item text='Admin'>
              <Dropdown.Menu>
                <Dropdown.Item><Button primary onClick={logOut}>Sign Out</Button></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
