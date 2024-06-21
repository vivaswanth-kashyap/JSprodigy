import axios from "axios";
import Navbar from "../../components/Navbar";

const Profile = ({ profileData }) => {
	if (!profileData) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-2xl font-semibold text-gray-500">
					No profile data available
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="max-w-4xl mx-auto py-8">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h1 className="card-title text-4xl font-bold mb-4">User Profile</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<p className="text-lg font-semibold mb-2">First Name:</p>
								<p className="text-base">{profileData.fname}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Last Name:</p>
								<p className="text-base">{profileData.lname}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Email:</p>
								<p className="text-base">{profileData.email}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Phone Number:</p>
								<p className="text-base">{profileData.phone}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Date of Birth:</p>
								<p className="text-base">{profileData.dob}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Gender:</p>
								<p className="text-base">{profileData.gender}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Occupation:</p>
								<p className="text-base">{profileData.occupation}</p>
							</div>
							<div>
								<p className="text-lg font-semibold mb-2">Education Level:</p>
								<p className="text-base">{profileData.educationLevel}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

export async function getServerSideProps(context) {
	const { uid } = context.params;

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
