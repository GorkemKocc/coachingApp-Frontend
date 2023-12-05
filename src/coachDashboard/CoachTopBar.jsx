import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import AdminServis from '../services/adminService';

export default function TopBar({ onItemClick, selectedMenuItem }) {

    let { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const [coach, setCoach] = useState([]);

    useEffect(() => {
        let adminService = new AdminServis();
        adminService.getByCoachId(id).then(result => {
            setCoach(result.data);
        });
    }, [id]);


    const logOut = () => {
        navigate("/")
    }


    return (
        <div>
            <Menu size='large' inverted>
                <Container>
                    <Menu.Item name='Trainer' />
                    <Menu.Menu position='right'>
                        <Dropdown item text={`${coach.firstName} ${coach.lastName} `}>
                            <Dropdown.Menu>
                                <Dropdown.Item><Button  onClick={logOut}>Sign Out</Button></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item as={NavLink} to="messages" name='Messages' active={selectedMenuItem === 'Messages'} onClick={onItemClick}/>

                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    );
}
