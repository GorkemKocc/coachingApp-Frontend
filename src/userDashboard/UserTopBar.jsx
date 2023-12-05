import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import AdminServis from '../services/adminService';

export default function TopBar() {
    let { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {
        let adminService = new AdminServis();
        adminService.getByUserId(id).then(result => {
            setUser(result.data);
        });
    }, [id]);


    const logOut = () => {
        navigate("/")
    }

    return (
        <div>
            <Menu size='large' inverted>
                <Container>
                    <Menu.Item name='Client'/>
                    <Menu.Menu position='right'>
                        <Dropdown item text={`${user.firstName} ${user.lastName} `}>
                        <Dropdown.Menu>
                                <Dropdown.Item><Button  onClick={logOut}>Sign Out</Button></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    );
}
