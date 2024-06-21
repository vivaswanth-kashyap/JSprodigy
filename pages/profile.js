import axios from "axios";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";

const Profile = ({ profileData }) => {
	if (!profileData) {
		return <div>No profile data available</div>;
	}

	return (
		<div>
			<Navbar />
			<h1>User Profile</h1>
			<p>First Name: {profileData.firstName}</p>
			<p>Last Name: {profileData.lastName}</p>
			<p>Email: {profileData.email}</p>
			<p>Phone Number: {profileData.phoneNumber}</p>
			<p>Date of Birth: {profileData.dateOfBirth}</p>
			<p>Gender: {profileData.gender}</p>
			<p>Occupation: {profileData.occupation}</p>
			<p>Education Level: {profileData.educationLevel}</p>
		</div>
	);
};

export async function getServerSideProps() {
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const uid = currentUser ? currentUser.uid : null;

	try {
		const response = await axios.get(`https://api.jsprodigy.com/users/${uid}`);
		const profileData = await response.data;

		console.log(profileData);
		return {
			props: {
				profileData,
			},
		};
	} catch (error) {
		console.error("Failed to fetch user profile data:", error);
		return {
			props: {
				profileData: null,
			},
		};
	}
}

export default Profile;
