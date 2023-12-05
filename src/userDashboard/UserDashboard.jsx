import React, { useState } from 'react'
import { Container, Grid } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navi from './UserNavi';
import TopBar from './UserTopBar';
import UserUpdate from '../userPages/UserUpdate';
import NutritionPlanList from '../nutritionPages/NutritionPlanList';
import ProgramList from '../programPages/ProgramList';
import ProgressRecordRegistration from '../progressRecordPages/ProgressRecordRegistration';
import ProgressRecordUpdate from '../progressRecordPages/ProgressRecordUpdate';



export default function UserDashboard() {

    let { id } = useParams();

    console.log(id)
    const navigate = useNavigate()

    const location = useLocation()

    const [selectedNaviItem, setSelectedNaviItem] = useState('');


    const handleNaviItemClick = (e, { name }) => {
        console.log(name)
        setSelectedNaviItem(name);
        navigate(`/client/${id}/${name.toLowerCase()}`)
    };

    return (
        <div>

            <TopBar />
            <ToastContainer position="bottom-right" />
            <Container style={{ width: '1500px' }} className="main" >
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2} textAlign='center' style={{ marginLeft: '-60px' }}>
                            <Navi onItemClick={handleNaviItemClick} selectedNaviItem={selectedNaviItem} />
                        </Grid.Column>
                        <Grid.Column width={14} style={{ maxWidth: selectedNaviItem.includes('Program') || selectedNaviItem.includes('Nutrition Plan') ? '77%' : '100%' }}>
                            <Routes>
                                <Route path={"/my account"} element={<UserUpdate />} />
                                <Route path={"/nutrition plans"} element={<NutritionPlanList />} />
                                <Route path={"/exercise programs"} element={<ProgramList />} />
                                <Route path={"/add record"} element={<ProgressRecordRegistration />} />
                                <Route path={"/update record"} element={<ProgressRecordUpdate />} />


                            </Routes>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

        </div>
    )
}
