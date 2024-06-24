import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import {
	User,
	Mail,
	Phone,
	Calendar,
	Briefcase,
	GraduationCap,
} from "lucide-react";

const ProfileField = ({ icon, label, value }) => (
	<div className="flex items-center space-x-3 mb-4">
		{icon}
		<div>
			<p className="text-sm font-medium text-gray-500">{label}</p>
			<p className="text-base font-semibold">{value || "Not provided"}</p>
		</div>
	</div>
);

const Profile = ({ profileData }) => {
	if (!profileData) {
		return (
			<div className="flex justify-center items-center h-screen bg-base-200">
				<div className="text-2xl font-semibold text-gray-500">
					No profile data available
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="max-w-4xl mx-auto py-8 mt-16 px-4">
				<div className="card bg-base-100 shadow-xl overflow-hidden">
					<div className="bg-primary h-32"></div>
					<div className="card-body pt-0 px-6">
						<div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-6">
							<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
								<img
									src={
										profileData.profilePicture ||
										"https://via.placeholder.com/128"
									}
									alt={`${profileData.fname} ${profileData.lname}`}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
								<h1 className="text-3xl font-bold">{`${profileData.fname} ${profileData.lname}`}</h1>
								<p className="text-gray-500">{profileData.occupation}</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<ProfileField
									icon={<Mail className="w-5 h-5 text-gray-400" />}
									label="Email"
									value={profileData.email}
								/>
								<ProfileField
									icon={<Phone className="w-5 h-5 text-gray-400" />}
									label="Phone Number"
									value={profileData.phone}
								/>
								<ProfileField
									icon={<Calendar className="w-5 h-5 text-gray-400" />}
									label="Date of Birth"
									value={profileData.dob}
								/>
							</div>
							<div>
								<ProfileField
									icon={<User className="w-5 h-5 text-gray-400" />}
									label="Gender"
									value={profileData.gender}
								/>
								<ProfileField
									icon={<Briefcase className="w-5 h-5 text-gray-400" />}
									label="Occupation"
									value={profileData.occupation}
								/>
								<ProfileField
									icon={<GraduationCap className="w-5 h-5 text-gray-400" />}
									label="Education Level"
									value={profileData.educationLevel}
								/>
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
		const profileData = response.data;
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
