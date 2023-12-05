import React, { useState, useEffect } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import CoachServis from '../services/coachService';
import { Link, useLocation } from 'react-router-dom';
import AdminServis from '../services/adminService';

export default function CoachList() {

    const [coaches, setCoaches] = useState([])

    useEffect(() => {
        let adminService = new AdminServis()
        adminService.getCoaches().then(result => setCoaches(result.data))
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
                        <Table.HeaderCell>Specialization</Table.HeaderCell>
                        <Table.HeaderCell>Experience</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        coaches.map(coach => (
                            <Table.Row key={coach.coachId} textAlign='center'>
                                <Table.Cell>{coach.coachId}</Table.Cell>
                                <Table.Cell><Link to={`/${path}/coach/update/${coach.coachId}`}>{coach.firstName}</Link></Table.Cell>
                                <Table.Cell>{coach.lastName}</Table.Cell>
                                <Table.Cell>{new Date(coach.birthDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{coach.gender}</Table.Cell>
                                <Table.Cell>{coach.email}</Table.Cell>
                                <Table.Cell>{coach.password}</Table.Cell>
                                <Table.Cell>{coach.phoneNumber}</Table.Cell>
                                <Table.Cell>{coach.specialization}</Table.Cell>
                                <Table.Cell>{coach.experience}</Table.Cell>
                                <Table.Cell>{coach.active ? 'Yes' : 'No'}</Table.Cell>
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
