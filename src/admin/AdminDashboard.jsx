import React, { useState } from 'react'
import Navi from './Navi.jsx';
import { Container, Grid } from 'semantic-ui-react';
import CoachRegistration from '../coachPages/CoachRegistration.jsx';
import TopBar from './TopBar.jsx';
import UserRegistration from '../userPages/UserRegistration.jsx';
import CoachList from '../coachPages/CoachList.jsx';
import { ToastContainer } from 'react-toastify';
import CoachUpdate from '../coachPages/CoachUpdate.jsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import UserList from '../userPages/UserList.jsx';
import UserUpdate from '../userPages/UserUpdate.jsx';



export default function AdminDashboard() {

  const navigate = useNavigate()
  
  const location = useLocation()
  
  const [selectedNaviItem, setSelectedNaviItem] = useState('');

  const [selectedTopBarItem, setSelectedTopBarItem] = useState('');
  const handleNaviItemClick = (e, { name }) => {

    setSelectedNaviItem(name);

    if (selectedTopBarItem !== "" && !location.pathname.includes(name.toLowerCase())){
      navigate(`/admin/${selectedTopBarItem.toLowerCase()}/${name.toLowerCase()}`)
    }
      
  };
  const handleTopBarItemClick = (e, { name }) => {
    setSelectedTopBarItem(name);
  };

  const coachMenuComponentMap = {
    'Add': <CoachRegistration />,
    'List': <CoachList />,
    'Update': <CoachUpdate />
  };
  const userMenuComponentMap = {
    'Add': <UserRegistration />,
    'List': <UserList />,
    'Update': <UserUpdate />
  };

  return (
    <div>
      <TopBar onItemClick={handleTopBarItemClick} selectedTopBarItem={selectedTopBarItem} />
      <ToastContainer position="bottom-right" />
      <Container style={{ width: '1500px' }} className="main">
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} textAlign='center'>
              <Navi onItemClick={handleNaviItemClick} selectedNaviItem={selectedNaviItem} />
            </Grid.Column>
            <Grid.Column width={14}>
              <Routes>
                {selectedTopBarItem === 'Coach' ? <Route path={`/coach/${selectedNaviItem.toLowerCase()}`} element={coachMenuComponentMap[selectedNaviItem]} /> : null}
                {selectedTopBarItem === 'User' ? <Route path={`/user/${selectedNaviItem.toLowerCase()}`} element={userMenuComponentMap[selectedNaviItem]} /> : null}
                <Route path={"/coach/update/:id"} element={<CoachUpdate />} />
                <Route path={"/user/update/:id"} element={<UserUpdate />} />
              </Routes>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}
