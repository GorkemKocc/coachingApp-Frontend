import React, { useState } from 'react';
import { Button, Table, Input, Grid, Container } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useParams } from 'react-router-dom';
import UserServis from '../services/userService';

export default function ProgressRecordRegistration() {
    let { id } = useParams();

    const [formErrors, setFormErrors] = useState({});

    const [progressRecords, setProgressRecords] = useState([
        { userId: id, bodyFatPercentage: 10.2, bodyMassIndex: 10.2, height: 180.1, weight: 80.5, muscleMass: 10.2, recordDate: null, isActive: true },
    ]);

    const handleBodyFatPercentageChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].bodyFatPercentage = value;
        setProgressRecords(updatedProgressRecords);
    };

    const handleBodyMassIndexChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].bodyMassIndex = value;
        setProgressRecords(updatedProgressRecords);
    };

    const handleHeightChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].height = value;
        setProgressRecords(updatedProgressRecords);
    };

    const handleWeightChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].weight = value;
        setProgressRecords(updatedProgressRecords);
    };

    const handleMuscleMassChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].muscleMass = value;
        setProgressRecords(updatedProgressRecords);
    };

    const handleRecordDateChange = (e, { value }, index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords[index].recordDate = value;
        setProgressRecords(updatedProgressRecords);
    };

    const addRow = () => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords.push({ userId: id, bodyFatPercentage: 10.2, bodyMassIndex: 10.2, height: 180.1, weight: 80.5, muscleMass: 10.2, recordDate: null, isActive: true });
        setProgressRecords(updatedProgressRecords);
    };

    const removeRow = (index) => {
        const updatedProgressRecords = [...progressRecords];
        updatedProgressRecords.splice(index, 1);
        setProgressRecords(updatedProgressRecords);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(progressRecords);

        try {
            let userService = new UserServis();

            for (const record of progressRecords) {
                try {
                    record.userId = id;
                    console.log(record);
                    const response = await userService.addProgressRecord(record);
                    console.log('Progress Record added:', response.data);
                    toast.success('Progress Record Registration Successful');
                } catch (error) {
                    console.error('Error adding progress record:', error);
                    toast.error('Progress Record Registration Failed');
                }
            }
        } catch (validationError) {
            const errors = {};
            validationError.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setFormErrors(errors);
            console.error('Validation error:', validationError.errors);
            toast.error('Validation error. Please check your input.');
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
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {progressRecords.map((record, index) => (
                                <Table.Row key={index} textAlign='center'>
                                    <Table.Cell>
                                        <Input
                                            type='number'
                                            value={record.bodyFatPercentage}
                                            onChange={(e, { value }) => handleBodyFatPercentageChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type='number'
                                            value={record.bodyMassIndex}
                                            onChange={(e, { value }) => handleBodyMassIndexChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type='number'
                                            value={record.height}
                                            onChange={(e, { value }) => handleHeightChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type='number'
                                            value={record.weight}
                                            onChange={(e, { value }) => handleWeightChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type='number'
                                            value={record.muscleMass}
                                            onChange={(e, { value }) => handleMuscleMassChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type='date'
                                            value={record.recordDate || ''}
                                            onChange={(e, { value }) => handleRecordDateChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color='red' icon='delete' onClick={() => removeRow(index)} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row>
                    <Button color='green' content='Save' onClick={handleSave} style={{ marginLeft: '1200px' }}/>
                </Grid.Row>
            </Grid>
        </Container>
    );
}
