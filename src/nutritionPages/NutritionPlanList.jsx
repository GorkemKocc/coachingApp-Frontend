import React, { useState, useEffect } from 'react';
import UserServis from '../services/userService';
import { useParams } from 'react-router-dom';
import { Icon, Menu, Table } from 'semantic-ui-react';

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function NutritionPlanList() {
  let { id } = useParams();

  const [nutrition, setNutrition] = useState([]);

  useEffect(() => {
    let userSerice = new UserServis();
    userSerice.getNutritionPlans(id).then((result) => {
      const sortedNutrition = result.data.sort((a, b) => dayOrder.indexOf(a.mealDay) - dayOrder.indexOf(b.mealDay));
      setNutrition(sortedNutrition);
    });
  }, [id]);

  return (
    <div className="custom">
      <Table celled>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Meal Day</Table.HeaderCell>
            <Table.HeaderCell>Meal</Table.HeaderCell>
            <Table.HeaderCell>Calorie</Table.HeaderCell>
            <Table.HeaderCell>Goal</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {nutrition.map((nutrition) => (
            <Table.Row key={nutrition.planId} textAlign='center'>
              <Table.Cell>{nutrition.planId}</Table.Cell>
              <Table.Cell>{nutrition.mealDay}</Table.Cell>
              <Table.Cell>{nutrition.meal}</Table.Cell>
              <Table.Cell>{nutrition.calorie}</Table.Cell>
              <Table.Cell>{nutrition.goal}</Table.Cell>
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
