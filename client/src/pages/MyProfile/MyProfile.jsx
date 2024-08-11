import React, { useState } from 'react';
import { deleteUser, updatePassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import "./MyProfile.scss";
import UserCard from "../../components/UserCard/UserCard";
import UserTeams from "../../components/UserCard/UserTeams";
import Jaden from "../../assets/ProfilePics/Jaden.jpeg";
import gsw from "../../assets/teams/gsw.png";
import lal from "../../assets/teams/lal.png";
import nyk from "../../assets/teams/nyk.png";
import okc from "../../assets/teams/okc.png";

const MyProfile = () => {
  const placeholderDesc = "This is a placeholder description.";
  const pLink = "https://example.com"; // Replace with actual link if available

  const teamsData = [
    {
      id: 1,
      img: gsw,
      title: "Golden State Warriors",
      description: placeholderDesc,
      link: pLink,
    },
    {
      id: 3,
      img: nyk,
      title: "New York Knicks",
      description: placeholderDesc,
      link: pLink,
    },
    {
      id: 2,
      img: lal,
      title: "Los Angeles Lakers",
      description: placeholderDesc,
      link: pLink,
    },
    {
      id: 4,
      img: okc,
      title: "Oklahoma City Thunder",
      description: placeholderDesc,
      link: pLink,
    },
  ];

  const [followedTeams, setFollowedTeams] = useState({
    "Golden State Warriors": true,
    "New York Knicks": false,
    "Los Angeles Lakers": false,
    "Oklahoma City Thunder": false,
  });

  const toggleFollow = (teamTitle) => {
    setFollowedTeams((prev) => ({
      ...prev,
      [teamTitle]: !prev[teamTitle],
    }));
  };

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
    <div className="center-container">
      <div className="wrap">
        <div className="user-wrap">
          <UserCard username="Jadenar07" image={Jaden} />
        </div>
        <div className="team-wrap">
          <UserTeams
            cardsPerRow={3}
            sortedTeams={teamsData}
            followedTeams={followedTeams}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;