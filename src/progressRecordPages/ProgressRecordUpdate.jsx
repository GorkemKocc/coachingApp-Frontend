import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Grid, Container } from 'semantic-ui-react';
import CoachServis from '../services/coachService';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"
import { useParams } from 'react-router-dom';
import UserServis from '../services/userService';

export default function ProgressRecordUpdate() {
    let { id } = useParams();

    const [progressRecords, setProgressRecords] = useState([
        { recordId: 1, userId: id, bodyFatPercentage: 10.2, bodyMassIndex: 10.2, height: 180.1, weight: 80.5, muscleMass: 10.2, recordDate: null, isActive: true },
    ]);

    useEffect(() => {
        let userService = new UserServis();
        userService.getProgressRecords(id).then(result => {
            const activeRecords = result.data.filter(record => record.active);
            console.log(activeRecords);
            setProgressRecords(activeRecords);
        });
    }, [id]);
    console.log(progressRecords)
    const handleBodyFatChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].bodyFatPercentage = value;
        setProgressRecords(updatedRecords);
    };

    const handleBMIChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].bodyMassIndex = value;
        setProgressRecords(updatedRecords);
    };

    const handleHeightChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].height = value;
        setProgressRecords(updatedRecords);
    };

    const handleWeightChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].weight = value;
        setProgressRecords(updatedRecords);
    };

    const handleMuscleMassChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].muscleMass = value;
        setProgressRecords(updatedRecords);
    };

    const handleRecordDateChange = (e, { value }, index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].recordDate = value;
        setProgressRecords(updatedRecords);
    };

    const deactivateRecord = (index) => {
        const updatedRecords = [...progressRecords];
        updatedRecords[index].active = false;
        setProgressRecords(updatedRecords);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            let userService = new UserServis();

            for (const record of progressRecords) {
                try {
                    if (record.recordId !== '') {
                        console.log(record)
                        const response = await userService.updateProgressRecord(record);
                        console.log('Progress Record Updated:', response.data);
                        toast.success('Progress Record Update Successful');
                    }
                } catch (error) {
                    console.error('Error updating progress record:', error);
                    toast.error('Progress Record Update Failed');
                }
            }
        } catch (validationError) {
        }
    };

    return (
        <Container style={{ marginLeft: '-300px' }}>
            <Grid>
                <Grid.Row>
                    <Table>
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
                            {progressRecords.map((record, index) => (record.active ? (
                                <Table.Row key={index} textAlign='center'>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={record.bodyFatPercentage}
                                            onChange={(e, { value }) => handleBodyFatChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={record.bodyMassIndex}
                                            onChange={(e, { value }) => handleBMIChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={record.height}
                                            onChange={(e, { value }) => handleHeightChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={record.weight}
                                            onChange={(e, { value }) => handleWeightChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={record.muscleMass}
                                            onChange={(e, { value }) => handleMuscleMassChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="date"
                                            value={record.recordDate ? new Date(record.recordDate).toISOString().split('T')[0] : ''}
                                            onChange={(e, { value }) => handleRecordDateChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="red" icon="delete" onClick={() => deactivateRecord(index)} />
                                    </Table.Cell>
                                </Table.Row>) : null
                            ))}
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row>
                    <Button color="green" content="Update" onClick={handleUpdate} style={{ marginLeft: '1200px' }} />
                </Grid.Row>
            </Grid>
        </Container>
    );
}
