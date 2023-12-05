import React, { useState, useEffect } from 'react';
import './UserRegistration.css';
import { Checkbox, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import AdminServis from '../services/adminService';

export default function UserRegistration() {

  const schema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required'),
    gender: Yup.string().required('Required'),
    email: Yup.string().email('Enter a valid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    profilePicture: Yup.mixed().test('fileType', 'Only image files are supported', (value) => {
      if (value) {
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      }
      return true;
    }).nullable(),
    coachId: Yup.number(),
    goal: Yup.string().required('Required'),
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: null,
    gender: '',
    email: '',
    password: '',
    phoneNumber: '',
    profilePicture: null,
    coachId: null,
    goal: '',
  });

  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getCoaches()
      .then(result => {
        const activeCoaches = result.data.filter(coach => coach.active === true);
        setCoaches(activeCoaches);
      })
      .catch(error => {
        console.error('Error fetching coaches:', error);
      });
  }, []);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getUsers().then(result => setUsers(result.data));
  }, []);

  const [coachMails, setCoachMails] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getCoaches().then(result => setCoachMails(result.data));
  }, []);

  
  const emailCheck = () => {
    const emailExists = coachMails.some(coach => coach.email === formData.email) || users.some(user => user.email === formData.email);
    if (emailExists) {
      setFormErrors({ ...formErrors, email: 'Email already exists' });
      setFormData({ ...formData, email: undefined })
    }
  }

  const [profilePicturePreview, setProfilePicturePreview] = useState(
    process.env.PUBLIC_URL + '/photo.jpg'
  );

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setProfilePicturePreview(process.env.PUBLIC_URL + '/photo.jpg');
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      schema.validateSyncAt(name, { [name]: value });
      setFormErrors({ ...formErrors, [name]: undefined });
    } catch (validationError) {
      setFormErrors({ ...formErrors, [name]: validationError.message });
    }

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview('');
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const setCoach = () => {
    const matchingCoaches = coaches.filter(coach => coach.specialization === formData.goal);
    if (matchingCoaches.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingCoaches.length);
      const randomCoach = matchingCoaches[randomIndex];
      setFormData({ ...formData, coachId: randomCoach.coachId });
      console.log(formData)

    } else {
      console.error('No matching coach found for the goal:', formData.goal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.coachId !== null) {
      console.log(formData);
      try {
        await schema.validate(formData, { abortEarly: false });

        let adminService = new AdminServis();
        try {
          const response = await adminService.addUser(formData);
          toast.success('User Registration Successful');
          console.log('User added:', response.data);
          
        } catch (error) {
          console.error('Error adding user:', error);
        }
      } catch (validationError) {
        const errors = {};
        validationError.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);

        console.error('Validation error:', validationError.errors);
      }
    } else {
      toast.error('No eligible coach found for the goal');
    }
  };

  return (
    <div className="user-registration-container">
      <div className="column">
        <label>
          Profile Picture
          <div className="profile-picture-container" onClick={handleClick}>
            {profilePicturePreview ? (
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className="profile-preview"
              />
            ) : (
              <div className="empty-profile">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <div className="column">
        <label>
          First Name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && (
            <Label pointing basic color="red" content={formErrors.firstName}></Label>
          )}
        </label>

        <label>
          Last Name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && (
            <Label pointing basic color="red" content={formErrors.lastName}></Label>
          )}
        </label>

        <label>
          Birth Date
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate || ''}
            onChange={handleChange}
            className="birth-date-text"
          />
          {formErrors.birth_date && (
            <Label pointing basic color="red" content={formErrors.birthDate}></Label>
          )}
        </label>

        <label>
          Gender
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}

            className="select-height"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.gender && (
            <Label pointing basic color="red" content={formErrors.gender}></Label>
          )}
        </label>

      </div>
      <div className="column">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={emailCheck}
          />
          {formErrors.email && (
            <Label pointing basic color="red" content={formErrors.email}></Label>
          )}
        </label>

        <label>
          Password
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <Label pointing basic color="red" content={formErrors.password}></Label>
          )}
        </label>

        <label>
          Show Password
          <Checkbox
            checked={showPassword}
            onChange={handleShowPassword}
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {formErrors.phone_number && (
            <Label pointing basic color="red" content={formErrors.phoneNumber}></Label>
          )}
        </label>

        <label>
          Goal
          <select name="goal" value={formData.goal} onChange={handleChange} onBlur={setCoach} className="select-height">
            <option value="">Goal</option>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Weight Maintenance">Weight Maintenance</option>
            <option value="Muscle Gain">Muscle Gain</option>
          </select>
          {formErrors.goal && (
            <Label pointing basic color="red" content={formErrors.goal}></Label>
          )}
        </label>

        <form onSubmit={handleSubmit}>
          <button type="submit" className="button-width" onClick={setCoach}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );

}
