import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import './Login.css';
import AdminServis from '../services/adminService';
import { Route, Router, useNavigate } from 'react-router-dom';
import CoachDashboard from '../coachDashboard/CoachDashboard';
export default function Login() {

  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getCoaches().then(result => {
      const activeCoaches = result.data.filter(coach => coach.active === true);
      setCoaches(activeCoaches);
    });
  }, []);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getUsers().then(result => {
      // Filter users based on the 'active' property
      const activeUsers = result.data.filter(user => user.active === true);
      setUsers(activeUsers);
    });
  }, []);


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handlePasswordChange = (e) => {

    setNewPassword(e.target.value);
  
  
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const isCoach = coaches.some(coach => coach.email === loginData.email && coach.password === loginData.password);

    const isUser = users.some(user => user.email === loginData.email && user.password === loginData.password);
    if (loginData.email === "admin@admin" && loginData.password === "admin") {

      navigate('/admin')

    } else if (isCoach) {

      console.log('Coach login:', loginData);

      const loggedInCoach = coaches.find(coach => coach.email === loginData.email && coach.password === loginData.password);

      navigate(`/trainer/${loggedInCoach.coachId}`)

    } else if (isUser) {
      console.log('User login:', loginData);

      const loggedInClient = users.find(user => user.email === loginData.email && user.password === loginData.password);
      console.log(loggedInClient)

      navigate(`/client/${loggedInClient.userId}`)
      
    } else {
      console.log('Invalid login credentials');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Şifre değiştirme işlemini gerçekleştirin.
    console.log('New Password:', newPassword);
    // Örneğin, bir API'ye post isteği göndermek gibi.
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="login-container">

      {activeTab === 'login' ? (
        <form onSubmit={handleLogin}>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Password
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Show Password
            <Checkbox
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </label>

          <button type="submit">Login</button>

        </form>
      ) : (
        <form onSubmit={handleChangePassword}>

           <label>
            Email
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit">Change Password</button>
        </form>
      )}
      <div className="tab-container">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => handleTabChange('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'changePassword' ? 'active' : ''}
          onClick={() => handleTabChange('changePassword')}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
