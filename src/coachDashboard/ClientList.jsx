import React, { useState, useEffect } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import CoachServis from '../services/coachService';
import { Link } from 'react-router-dom';

export default function ClientList() {

    const [clients, setClients] = useState([])

    /*useEffect(() => {
        let coachService = new CoachServis()
        coachService.getAllClients(1).then(result => setClients(result.data))
    })*/
    useEffect(() => {
        let coachService = new CoachServis();
        coachService.getAllClients(1).then(result => {
            // Filter clients based on the 'active' property
            const activeClients = result.data.filter(client => client.active === true);

            // Set the filtered clients to the state
            setClients(activeClients);
        });
    }, []);

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
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Goal</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        clients.map(client => (

                            <Table.Row key={client.userId} textAlign='center'>
                                <Table.Cell>{client.userId}</Table.Cell>
                                <Table.Cell><Link to={`/trainer/1/client/${client.userId}`}>{client.firstName}</Link></Table.Cell>
                                <Table.Cell>{client.lastName}</Table.Cell>
                                <Table.Cell>{new Date(client.birthDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{client.gender}</Table.Cell>
                                <Table.Cell>{client.email}</Table.Cell>
                                <Table.Cell>{client.phoneNumber}</Table.Cell>
                                <Table.Cell>{client.goal}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='8'>
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
