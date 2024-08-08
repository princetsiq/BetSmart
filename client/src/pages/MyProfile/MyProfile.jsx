import React from 'react';
import { deleteUser, updatePassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
	const navigate = useNavigate();
	async function handleDeleteUser() {
		try {
			await deleteUser();
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdatePassword() {
		try {
			await updatePassword({
				oldPassword: "hunter2",
				newPassword: "hunter3",
			});
		} catch (error) {
			console.log(error);
		}
	}

	

	return (
		<h1>MyProfile</h1>
	);
};

export default MyProfile;