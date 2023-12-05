
import React, { useState, useRef, useEffect } from 'react';
import './UserRegistration.css';
import { Button, Checkbox, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"
import { useParams } from 'react-router-dom';
import AdminServis from '../services/adminService';

export default function UserUpdate() {

    let { id } = useParams()

    const [, setUser] = useState({})

    useEffect(() => {
        let adminService = new AdminServis()
        adminService.getByUserId(id).then(result => {
            setUser(result.data);

            const formattedBirthDate = new Date(result.data.birthDate).toISOString().split('T')[0];
            console.log(result.data)
            setFormData({
                userId: result.data.userId,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                birthDate: formattedBirthDate,
                gender: result.data.gender,
                email: result.data.email,
                password: result.data.password,
                phoneNumber: result.data.phoneNumber,
                coach: result.data.coach,
                goal: result.data.goal,
            });


            result.data.active ? setActiveButton("Active") : setActiveButton("Passive");
            if (result.data.profilePicture) {
                setProfilePicturePreview(result.data.profilePicture);
            }
        })
    }, [id]);

    const fileInputRef = useRef();

    const schema = Yup.object({
        userId: Yup.number(),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        birthDate: Yup.date().required('Required'),
        gender: Yup.string().required('Required'),
        email: Yup.string().email('Enter a valid email address').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        phoneNumber: Yup.string().required('Required').nullable(),
        active: Yup.boolean().required('Required'),
        goal: Yup.string().required('Required'),
    });

    const [formData, setFormData] = useState({
        userId: parseInt(id, 10),
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        email: '',
        password: '',
        phoneNumber: '',
        coach: {},
        active: true,
        goal: '',
    });

    const [profilePicturePreview, setProfilePicturePreview] = useState(
        process.env.PUBLIC_URL + '/photo.jpg'
    );

    const [formErrors, setFormErrors] = useState({});

    const [activeButton, setActiveButton] = useState('Active');

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setFormData((prevData) => ({
            ...prevData,
            active: buttonName === "Active",
        }));
    };
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
        const emailExists = coachMails.some(coach => coach.email === formData.email) || users.some(user => user.email === formData.email && user.userId !== formData.userId);
        if (emailExists) {
            setFormErrors({ ...formErrors, email: 'Email already exists' });
            setFormData({ ...formData, email: undefined })
        }
    }

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


    const handleShowPassword = () => {
        console.log(formData)
        setFormData({ ...formData, showPassword: !formData.showPassword });
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
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(formData.id);

        try {
            await schema.validate(formData, { abortEarly: false });
            console.log(formData)
            let adminService = new AdminServis();
            try {
                const response = await adminService.updateUser(formData)
                console.log('User Updated:', response.data);
                toast.success('User Updated Successful')
                window.location.reload()
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } catch (validationError) {
            const errors = {};
            validationError.inner.forEach((error) => {
                errors[error.path] = error.message;
            });
            setFormErrors(errors);
            console.error('Validation error:', validationError.errors);
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
                    Phone Number
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    {formErrors.phoneNumber && (
                        <Label pointing basic color="red" content={formErrors.phoneNumber}></Label>
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
                    Goal
                    <select name="goal" value={formData.goal} onChange={handleChange} className="select-height">
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

                <div style={{ marginRight: '135px', marginTop: '10px', marginBottom: '10px' }}>
                    <Button.Group>
                        <Button negative={activeButton === 'Passive'} onClick={() => handleButtonClick('Passive')}>
                            Passive
                        </Button>
                        <Button.Or text='' />
                        <Button positive={activeButton === 'Active'} onClick={() => handleButtonClick('Active')}>
                            Active
                        </Button>
                    </Button.Group>
                </div>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="button-width">Update</button>
                </form>
            </div>
        </div>
    );

}  
