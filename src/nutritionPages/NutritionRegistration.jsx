import React, { useState } from 'react';
import { Button, Table, Input, Grid, Container, Select } from 'semantic-ui-react';
import CoachService from '../services/coachService';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { useParams } from 'react-router-dom';

export default function NutritionRegistration() {

    let { clientId } = useParams();

    const [formErrors, setFormErrors] = useState({});

    const [nutritions, setNutritions] = useState([
        { userId: clientId, calorie: 300, meal: '', mealDay: '', goal: '', active: true }
    ]);

    console.log(nutritions);

    const handleMealChange = (e, { value }, index) => {
        const updatedNutritions = [...nutritions];
        updatedNutritions[index].meal = value;
        setNutritions(updatedNutritions);
    };

    const handleMealDayChange = (e, index, value) => {
        const updatedNutritions = [...nutritions];
        updatedNutritions[index].mealDay = value;
        setNutritions(updatedNutritions);
    };

    const handleGoalChange = (e, data) => {
        const { value } = data;
        const updatedNutritions = nutritions.map((nutrition) => ({
            ...nutrition,
            goal: value,
        }));
        setNutritions(updatedNutritions);
    };


    const handleCalorieChange = (e, { value }, index) => {
        const updatedNutritions = [...nutritions];
        updatedNutritions[index].calorie = value;
        setNutritions(updatedNutritions);
    };

    const addRow = () => {
        const updatedNutritions = [...nutritions];
        updatedNutritions.push({ userId: clientId, calorie: 300, meal: '', mealDay: '', goal: '', active: true });
        setNutritions(updatedNutritions);
    };

    const removeRow = (index) => {
        const updatedNutritions = [...nutritions];
        updatedNutritions.splice(index, 1);
        setNutritions(updatedNutritions);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(nutritions);

        try {
            let coachService = new CoachService();

            for (const nutrition of nutritions) {
                try {
                    nutrition.userId = clientId;
                    console.log(nutrition);

                    const response = await coachService.addNutritionPlan(nutrition);

                    console.log('Nutrition added:', response.data);
                    toast.success('Nutrition Registration Successful');
                } catch (error) {
                    console.error('Error adding nutrition:', error);
                    toast.error('Nutrition Registration Failed');
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
                                <Table.HeaderCell>Day</Table.HeaderCell>
                                <Table.HeaderCell>Meal</Table.HeaderCell>
                                <Table.HeaderCell>Calorie</Table.HeaderCell>
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
                            {nutritions.map((nutrition, index) => (
                                <Table.Row key={index} textAlign='center'>
                                    <Table.Cell>
                                        <Select
                                            placeholder="Select Meal Day"
                                            options={[
                                                { key: 'monday', text: 'Monday', value: 'Monday' },
                                                { key: 'tuesday', text: 'Tuesday', value: 'Tuesday' },
                                                { key: 'wednesday', text: 'Wednesday', value: 'Wednesday' },
                                                { key: 'thursday', text: 'Thursday', value: 'Thursday' },
                                                { key: 'friday', text: 'Friday', value: 'Friday' },
                                                { key: 'saturday', text: 'Saturday', value: 'Saturday' },
                                                { key: 'sunday', text: 'Sunday', value: 'Sunday' },
                                            ]}
                                            value={nutrition.mealDay}
                                            onChange={(e, { value }) => handleMealDayChange(e, index, value)}
                                        />
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Input
                                            type="text"
                                            value={nutrition.meal}
                                            onChange={(e, { value }) => handleMealChange(e, { value }, index)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            type="number"
                                            value={nutrition.calorie}
                                            onChange={(e, { value }) => handleCalorieChange(e, { value }, index)}
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
