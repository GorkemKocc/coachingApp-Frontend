import React, { useState, useEffect } from 'react';
import UserServis from '../services/userService';
import { Link, useParams } from 'react-router-dom';
import { Icon, Menu, Table } from 'semantic-ui-react';

export default function ProgramList() {
    let { id } = useParams();

    const [exercise, setExercise] = useState([]);

    useEffect(() => {
        let userSerice = new UserServis();
        userSerice.getPrograms(id).then(result => setExercise(result.data))
    })

    return (
        <div className="custom">
            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>id</Table.HeaderCell>
                        <Table.HeaderCell>Exercise Name</Table.HeaderCell>
                        <Table.HeaderCell>Sets</Table.HeaderCell>
                        <Table.HeaderCell>Reps</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Video</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Goal</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {exercise.map((exercise) => (
                        <Table.Row key={exercise.programId} textAlign='center'>
                            <Table.Cell>{exercise.programId}</Table.Cell>
                            <Table.Cell>{exercise.exercise}</Table.Cell>
                            <Table.Cell>{exercise.sets}</Table.Cell>
                            <Table.Cell>{exercise.reps}</Table.Cell>
                            <Table.Cell>{exercise.duration}</Table.Cell>
                            <Table.Cell><Link to={exercise.videoGuideUrl}>{exercise.videoGuideUrl}</Link></Table.Cell>
                            <Table.Cell>{new Date(exercise.startDate).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>{exercise.goal}</Table.Cell>
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
