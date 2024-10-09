import React, { useEffect, useState } from 'react';
import { getSingleProfile , deleteProfile, updateProfile } from '../Api/AllApi';
import '../CSS/Profile.css'; 
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
const navigate =useNavigate()
  const getAllData = async () => {
    try {
      const res = await getSingleProfile();
      setProfile(res);

      setFormData({
        name: res.name,
        email: res.email,
        phone: res.phone,
        role: res.role
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(profile._id, formData);
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteProfile(profile._id);
      alert('Profile deleted successfully!');
      setProfile({});
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className="profile-container">
      {profile && (
        <>
          {editMode ? (
            <form className="profile-form" onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleInputChange}>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Institute">Institute</option>
                </select>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          ) : (
            <div className="profile-view">
              <h2>Profile Information</h2>
              <p><strong>ID:</strong> {profile._id}</p>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => navigate('/message')} >go to the message</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
