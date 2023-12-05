import React, { useState } from 'react';
import {Select, Button, Table, Input, Grid, Container } from 'semantic-ui-react';
import CoachServis from '../services/coachService';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"
import { useParams } from 'react-router-dom';

export default function ProgramRegistration() {

    let { clientId } = useParams()

    const [formErrors, setFormErrors] = useState({});


    const [exercises, setExercises] = useState([
        { userId: clientId, exercise: '', sets: 3, reps: 12, videoGuideUrl: '', duration: '', startDate: null, goal: '', isActive: true }
    ]);
    console.log(exercises)
    const handleExerciseChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].exercise = value;
        setExercises(updatedExercises);
    };
    const handleGoalChange = (e, data) => {
        const { value } = data;
        const updatedExercises = exercises.map((exercise) => ({
            ...exercise,
            goal: value,
        }));
        setExercises(updatedExercises);
    };
    const handleSetsChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].sets = value;
        setExercises(updatedExercises);
    };

    const handleRepsChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].reps = value;
        setExercises(updatedExercises);
    };

    const handleVideoGuideUrlChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].videoGuideUrl = value;
        setExercises(updatedExercises);
    };

    const handleDurationChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].duration = value;
        setExercises(updatedExercises);
    };

    const handleStartDateChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].startDate = value;
        setExercises(updatedExercises);
    };

    const addRow = () => {
        const updatedExercises = [...exercises];
        updatedExercises.push({ userId: clientId, exercise: '', sets: 3, reps: 12, videoGuideUrl: '', duration: '', startDate: null, goal: '', isActive: true });
        setExercises(updatedExercises);
    };

    const removeRow = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises.splice(index, 1);
        setExercises(updatedExercises);
    };


    const handleSave = async (e) => {
        e.preventDefault();
        console.log(exercises);

        try {
            let coachService = new CoachServis();

            for (const exercise of exercises) {
                try {
                    exercise.userId = clientId;
                    console.log(exercise)
                    const response = await coachService.addProgram(exercise);

                    console.log('Program added:', response.data);
                    toast.success('Program Registration Successful');
                } catch (error) {
                    console.error('Error adding program:', error);
                    toast.error('Program Registration Failed');
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
                                <Table.HeaderCell>Exercise Name</Table.HeaderCell>
                                <Table.HeaderCell>Sets</Table.HeaderCell>
                                <Table.HeaderCell>Reps</Table.HeaderCell>
                                <Table.HeaderCell>Video Url</Table.HeaderCell>
                                <Table.HeaderCell>Duration</Table.HeaderCell>
                                <Table.HeaderCell>Start Date</Table.HeaderCell>
                                <Table.HeaderCell>
                                <Select
                                        placeholder="Select Goal"
                                        options={[
                                            { key: 'weightGain', text: 'Weight Gain', value: 'Weight Gain' },
                                            { key: 'weightLoss', text: 'Weight Loss', value: 'Weight Loss' },
                                            { key: 'weightMaintenance', text: 'Weight Maintenance', value: 'Weight Maintenance' },
                                            { key: 'muscleGain', text: 'Muscle Gain', value: 'Muscle Gain' },
                                        ]}
                                        onChange={(e, data) => handleGoalChange(e, data)}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {exercises.map((exercise, index) => (
                                <Table.Row key={index} textAlign='center'>
                                    <Table.Cell>
                                        <Input
                                            type="text"
                                            value={exercise.exercise}
                                            onChange={(e, { value }) => handleExerciseChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={exercise.sets}
                                            onChange={(e, { value }) => handleSetsChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={exercise.reps}
                                            onChange={(e, { value }) => handleRepsChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="text"
                                            value={exercise.videoGuideUrl}
                                            onChange={(e, { value }) => handleVideoGuideUrlChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="text"
                                            value={exercise.duration}
                                            onChange={(e, { value }) => handleDurationChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="date"
                                            value={exercise.startDate || ''}
                                            onChange={(e, { value }) => handleStartDateChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="red" icon="delete" onClick={() => removeRow(index)} />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Grid.Row>
                <Grid.Row>
                    <Button color="blue" icon="plus" content="Add Item" onClick={addRow} style={{ marginLeft: '950px' }} />
                    <Button color="green" content="Save" onClick={handleSave} />
                </Grid.Row>
            </Grid>
        </Container>
    );
}
