import React, { useState, useRef, useEffect } from 'react';
import './CoachRegistration.css';
import { Checkbox, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"
import AdminServis from '../services/adminService';

export default function CoachRegistration() {
  const fileInputRef = useRef();

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
    }),
    specialization: Yup.string().required('Required'),
    experience: Yup.string().required('Required'),
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: null,
    gender: '',
    email: '',
    password: '',
    phoneNumber: '',
    profilePicture: '',
    specialization: '',
    experience: ''
  });

  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getCoaches().then(result => setCoaches(result.data));
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let adminService = new AdminServis();
    adminService.getUsers().then(result => setUsers(result.data));
  }, []);

  const emailCheck = () => {
    const emailExists = coaches.some(coach => coach.email === formData.email) || users.some(user => user.email === formData.email);
    console.log(emailExists)
    if (emailExists) {
      setFormErrors({ ...formErrors, email: 'Email already exists' });
      setFormData({ ...formData, email: undefined })

    }
  }

  const [profilePicturePreview, setProfilePicturePreview] = useState(
    process.env.PUBLIC_URL + '/photo.jpg'
  );

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Hata kontrolünü burada yapın ve hatayı formErrors'e ekleyin
    try {
      schema.validateSyncAt(name, { [name]: value });
      setFormErrors({ ...formErrors, [name]: undefined });
    } catch (validationError) {
      setFormErrors({ ...formErrors, [name]: validationError.message });
    }
  };


  const handleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    

    const profile = file.getBytes();
    setFormData({ ...formData, profile_picture: profile });

    // Read and preview the image
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
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });

      let adminService = new AdminServis();
      try {
        const response = adminService.addCoach(formData);
        console.log('Coach added:', response.data);
        toast.success('Coach Registration Successful');
      } catch (error) {
        console.error('Error adding coach:', error);
      }
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setFormErrors(errors);
      console.error('Validation error:', validationError.errors);
      // Handle validation errors here
    }
  };


  return (
    <div className="coach-registration-container">
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
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <div className="column-location">
        <label>
          First Name
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {formErrors.firstName && (
            <Label pointing basic color="red" content={formErrors.firstName}></Label>
          )}
        </label>

        <label>
          Last Name
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {formErrors.lastName && (
            <Label pointing basic color="red" content={formErrors.lastName}></Label>
          )}
        </label>

        <label>
          Phone Number
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {formErrors.phoneNumber && (
            <Label pointing basic color="red" content={formErrors.phoneNumber}></Label>
          )}
        </label>

        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={emailCheck} />
          {formErrors.email && (
            <Label pointing basic color="red" content={formErrors.email}></Label>
          )}
        </label>

        <label>
          Password
          <input
            type={formData.showPassword ? 'text' : 'password'}
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
            checked={formData.showPassword}
            onChange={handleShowPassword}
          />
        </label>
      </div>
      <div className="column">

        <label>
          Birth Date
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate || ''}
            onChange={handleChange}
            className="birth-date-text"
          />
          {formErrors.birthDate && (
            <Label pointing basic color="red" content={formErrors.birthDate}></Label>
          )}
        </label>

        <label>
          Gender
          <select name="gender" value={formData.gender} onChange={handleChange} className="select-height">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.gender && (
            <Label pointing basic color="red" content={formErrors.gender}></Label>
          )}
        </label>

        <label>
          Specialization
          <select name="specialization" value={formData.specialization} onChange={handleChange} className="select-height">
            <option value="">Specialization</option>
            <option value="Weight Gain">Weight Gain</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Weight Maintenance">Weight Maintenance</option>
            <option value="Muscle Gain">Muscle Gain</option>
          </select>
          {formErrors.specialization && (
            <Label pointing basic color="red" content={formErrors.specialization}></Label>
          )}
        </label>

        <label>
          Experience
          <textarea name="experience" value={formData.experience} onChange={handleChange} />
          {formErrors.experience && (
            <Label pointing basic color="red" content={formErrors.experience}></Label>
          )}
        </label>

        <form onSubmit={handleSubmit}>
          <button type="submit" className="button-width">Submit</button>
        </form>
      </div>
    </div>
  );

}  