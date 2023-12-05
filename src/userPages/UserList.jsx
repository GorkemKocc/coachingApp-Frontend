import React, { useState, useEffect } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import AdminServis from '../services/adminService';

export default function UserList() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        let adminService = new AdminServis()
        adminService.getUsers().then(result => setUsers(result.data))
    })
    const location = useLocation();
    const path = location.pathname.includes("admin") ? "admin" : null;

    return (
        <div className="custom">
            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Birth Date</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Mail</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Coach Name</Table.HeaderCell>
                        <Table.HeaderCell>Goal</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        users.map(user => (

                            <Table.Row key={user.userId} textAlign='center'>
                                <Table.Cell>{user.userId}</Table.Cell>
                                <Table.Cell><Link to={`/${path}/user/update/${user.userId}`}>{user.firstName}</Link></Table.Cell>
                                <Table.Cell>{user.lastName}</Table.Cell>
                                <Table.Cell>{new Date(user.birthDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{user.gender}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.password}</Table.Cell>
                                <Table.Cell>{user.phoneNumber}</Table.Cell>
                                <Table.Cell>
                                    {user.coach ? `${user.coach.firstName} ${user.coach.lastName}` : 'No Coach'}
                                </Table.Cell>
                                <Table.Cell>{user.goal}</Table.Cell>
                                <Table.Cell>{user.active ? 'Yes' : 'No'}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='11'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}
