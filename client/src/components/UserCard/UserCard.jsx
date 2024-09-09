import React, { useEffect, useState } from "react";
import axios from "axios";
import { deleteUser, updatePassword, fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faCamera, faUserEdit, faLock, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import "./UserCard.css";

const UserCard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [useIconAsPfp, setUseIconAsPfp] = useState(false);
  const [initials, setInitials] = useState('');
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      const usernameResponse = await axios.get('http://localhost:5002/api/get-username', {
        params: { email: userEmail },
      });
      
      const pfpResponse = await axios.get('http://localhost:5002/api/get-picture', {
        params: { email: userEmail },
      });

      const { pfpType, initials, image } = pfpResponse.data;

      setUsername(usernameResponse.data);
      setInitials(initials);

      if (pfpType === 'initials') {
        setProfilePicture(null);
        setUseIconAsPfp(false);
      } else if (pfpType === 'image') {
        setProfilePicture(image);
        setUseIconAsPfp(false);
      } else {
        setProfilePicture(null); 
        setUseIconAsPfp(true);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };


  useEffect (() => {
    fetchUserInfo();
  }, []);

  const handleInitialsClick = async () => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;
  
      await axios.put('http://localhost:5002/api/update-picture', {
        email: userEmail,
        pfpType: 'initials',
        initials, 
      });
  
      fetchUserInfo();
    } catch (error) {
      console.error('Error setting profile picture to initials:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
  
      try {
        const session = await fetchAuthSession();
        const userEmail = session.tokens.idToken.payload.email;
  
        formData.append('email', userEmail); 
        formData.append('pfpType', 'image');
  
        await axios.put('http://localhost:5002/api/update-picture', formData);

        fetchUserInfo();
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const handleRemovePicture = async () => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;
  
      await axios.delete('http://localhost:5002/api/delete-picture', { data: { email: userEmail } });
      fetchUserInfo();
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  const handleUpdateUsername = async () => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;

      const response = await axios.put('http://localhost:5002/api/update-username', {
        userEmail,
        username: newUsername,
      });

      if (response.status === 200) {
        setUsername(newUsername);
        alert('Username updated successfully!');
        setShowUsernameModal(false);
      }
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username.');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const session = await fetchAuthSession();
      const userEmail = session.tokens.idToken.payload.email;
  
      await deleteUser();
      await axios.delete('http://localhost:5002/api/delete-user', { data: { email: userEmail } });			
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdatePassword = async () => {
    try {
      const oldPassword = document.getElementById('old-password').value;
      const newPassword = document.getElementById('new-password').value;

      await updatePassword({
        oldPassword,
        newPassword,
      });
      alert("Password successfully changed!");
      setShowPasswordModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-card">
        <div className="user-card-img">
          {profilePicture ? (
            <img src={profilePicture} alt="User Profile" />
          ) : useIconAsPfp ? (
            <FontAwesomeIcon icon={faUser} size="8x" />
          ) : (
            <div className="initials-preview">{initials}</div>
          )}
        </div>
        <div className="user-card-header">
          <div className="icon-container">
            <FontAwesomeIcon
              icon={showSettings ? faChevronDown : faBars}
              onClick={() => setShowSettings(!showSettings)}
              className="user-settings-icon"
            />
          </div>
          <h3>{username}</h3>
        </div>
        {showSettings && (
          <div className="user-settings-popup">
            <div className="header">
              <h1>User Settings</h1>
            </div>
            <div className="user-settings-item">
              <button onClick={() => setShowUsernameModal(true)} className="user-settings-button">
                <FontAwesomeIcon icon={faUserEdit} className="user-settings-icon" />
                Change Username
              </button>
            </div>
            <div className="user-settings-item">
              <button onClick={() => setShowPasswordModal(true)} className="user-settings-button">
                <FontAwesomeIcon icon={faLock} className="user-settings-icon" />
                Change Password
              </button>
            </div>
            <div className="user-settings-item">
              <button onClick={() => setShowPictureModal(true)} className="user-settings-button">
                <FontAwesomeIcon icon={faCamera} className="user-settings-icon" />
                Change Profile Picture
              </button>
            </div>
            <div className="user-settings-item">
              <button onClick={() => setShowDeleteModal(true)} className="user-settings-button">
                <FontAwesomeIcon icon={faTrash} className="user-settings-icon" />
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {showUsernameModal && (
        <Modal onClose={() => setShowUsernameModal(false)}>
          <h2>Change Username</h2>
          <div className="modal-content">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
            />
            <button className="submit" onClick={handleUpdateUsername}>Update</button>
          </div>
        </Modal>
      )}

      {showPictureModal && (
        <Modal onClose={() => setShowPictureModal(false)}>
          <h2>Change Profile Picture</h2>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleInitialsClick}>Use Initials</button>
          <button onClick={handleRemovePicture}>Remove Picture</button>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <h2>Are you sure you want to delete your account?</h2>
          <p>All your personal data will be permanently lost.</p>
          <br />
          <div className="delete-buttons">
            <button onClick={handleDeleteUser} className="confirm-button">Yes, Delete My Account</button>
            <button onClick={() => setShowDeleteModal(false)} className="cancel-button">Cancel</button>
          </div>
        </Modal>
      )}

      {showPasswordModal && (
        <Modal onClose={() => setShowPasswordModal(false)}>
          <h2>Change Password</h2>
          <div className="modal-content">
            <div className="input-container">
              <input
                type="text"
                id="old-password"
                placeholder=" "
              />
              <label htmlFor="old-password">Old Password</label>
            </div>
            
            <div className="input-container">
              <input
                type="text"
                id="new-password"
                placeholder=" "
              />
              <label htmlFor="new-password">New Password</label>
            </div>

            <button className="submit" onClick={handleUpdatePassword}>Change Password</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserCard;