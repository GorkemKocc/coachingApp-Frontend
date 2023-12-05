import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon, Menu, Table } from 'semantic-ui-react';
import CoachServis from '../services/coachService';

export default function ProgressRecordList() {

    let { clientId } = useParams();

    const [records, setRecords] = useState([]);

    useEffect(() => {
        const coachService = new CoachServis();
        coachService.getProgressRecord(clientId).then(result => {

            const activeRecords = result.data.filter(record => record.active === true);

            const sortedRecords = activeRecords.sort((b, a) => new Date(b.recordDate) - new Date(a.recordDate));

            setRecords(sortedRecords);
        });
    }, [clientId]);

    return (
        <div className="custom">
            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>Body Fat Percentage</Table.HeaderCell>
                        <Table.HeaderCell>Body Mass Index</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                        <Table.HeaderCell>Weight</Table.HeaderCell>
                        <Table.HeaderCell>Muscle Mass</Table.HeaderCell>
                        <Table.HeaderCell>Record Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {records.map((record) => (
                        <Table.Row key={record.programId} textAlign='center'>
                            <Table.Cell>{record.bodyFatPercentage}</Table.Cell>
                            <Table.Cell>{record.bodyMassIndex}</Table.Cell>
                            <Table.Cell>{record.height}</Table.Cell>
                            <Table.Cell>{record.weight}</Table.Cell>
                            <Table.Cell>{record.muscleMass}</Table.Cell>
                            <Table.Cell>{new Date(record.recordDate).toLocaleDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
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
    );
}
