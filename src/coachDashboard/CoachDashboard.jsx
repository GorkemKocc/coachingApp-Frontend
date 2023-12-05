import React, { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navi from './CoachNavi';
import TopBar from './CoachTopBar';
import ProgramRegistration from '../programPages/ProgramRegistration.jsx';
import ClientList from './ClientList.jsx';
import CoachUpdate from '../coachPages/CoachUpdate.jsx'
import ProgressRecordList from '../progressRecordPages/ProgressRecordList.jsx';
import ProgramUpdate from '../programPages/ProgramUpdate.jsx';
import NutritionRegistration from '../nutritionPages/NutritionRegistration.jsx';
import NutritionUpdate from '../nutritionPages/NutritionUpdate.jsx';

export default function CoachDashboard() {
  let { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNaviItem, setSelectedNaviItem] = useState('');

  const handleNaviItemClick = (e, { name }) => {
    console.log(name);
    setSelectedNaviItem(name);
    if (name === 'My Account' || name === 'Clients') {
      navigate(`/trainer/${id}/${name.toLowerCase()}`);
    } else if (location.pathname.startsWith(`/trainer/${id}/client/`)) {
      const clientID = location.pathname.split('/')[4];
      navigate(`/trainer/${id}/client/${clientID}/${name.toLowerCase()}`);
    }
  };

  return (
    <div>
      <TopBar />
      <ToastContainer position="bottom-right" />
      <Container style={{ width: '1500px' }} className="main">
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} textAlign="center" style={{ marginLeft: '-60px' }}>
              <Navi onItemClick={handleNaviItemClick} selectedNaviItem={selectedNaviItem} />
            </Grid.Column>
            <Grid.Column width={14} style={{ maxWidth: selectedNaviItem.includes('Program') || selectedNaviItem.includes('Nutrition Plan') ? '77%' : '100%' }}>

              <Routes>
                <Route path={`/my account`} element={<CoachUpdate />} />
                <Route path={`/clients`} element={<ClientList />} />
                <Route path={`/client/:clientId/add program`} element={<ProgramRegistration />} />
                <Route path={`/client/:clientId/update program`} element={<ProgramUpdate />} />
                <Route path={`/client/:clientId/add nutrition plan`} element={<NutritionRegistration />} />
                <Route path={`/client/:clientId/update nutrition plan`} element={<NutritionUpdate />} />
                <Route path={`/client/:clientId/progress record`} element={<ProgressRecordList />} />
              </Routes>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
}
