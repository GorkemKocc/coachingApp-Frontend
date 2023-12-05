import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Input, Grid, Container } from 'semantic-ui-react';
import CoachServis from '../services/coachService';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"
import { useParams } from 'react-router-dom';


export default function ProgramUpdate() {


    let { clientId } = useParams()

    const [exercises, setExercises] = useState([
        { programId: 1, userId: clientId, exercise: '', sets: 3, reps: 12, videoGuideUrl: '', startDate: null, duration: '', goal: '', active: true }
    ]);

    useEffect(() => {
        let coachService = new CoachServis();
        coachService.getPrograms(clientId).then(result => {
            const activePrograms = result.data.filter(program => program.active);
            console.log(activePrograms);
            setExercises(activePrograms);
        });
    }, [clientId]);



    const [formErrors, setFormErrors] = useState({});



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
    const handleStartDateChange = (e, { value }, index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].startDate = value;
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

    const deactivateRow = (index) => {
        const updatedExercises = [...exercises];
        updatedExercises[index].active = false;
        setExercises(updatedExercises);
        console.log(exercises)
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        // console.log(exercises);

        try {
            let coachService = new CoachServis();

            for (const exercise of exercises) {
                try {

                    if (exercise.programId !== '') {
                        console.log(exercise)
                        const response = await coachService.updateProgram(exercise);
                        console.log('Program Updated:', response.data);
                        toast.success('Program Update Successful');
                    }

                } catch (error) {
                    console.error('Error updating program:', error);
                    toast.error('Program Update Failed');
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
    const formatDate = (date) => {
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : ''; 
        return formattedDate;
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
                                        value={exercises[0].goal}
                                        onChange={(e, data) => handleGoalChange(e, data)}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body >
                            {exercises.map((exercise, index) => (exercise.active ? (
                                <Table.Row key={index} textAlign='center'>
                                    <Table.Cell >
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
                                            value={formatDate(exercise.startDate)}
                                            onChange={(e, { value }) => handleStartDateChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color="red" icon="delete" onClick={() => deactivateRow(index)} />
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
