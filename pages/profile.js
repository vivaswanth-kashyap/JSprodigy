import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Profile() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		dateOfBirth: "",
		gender: "",
		occupation: "",
		educationLevel: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);

		try {
			const res = await axios.post("https://api.jsprodigy.com/users/profile", {
				uid: formData.uid,
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phoneNumber: formData.phoneNumber,
				dateOfBirth: formData.dateOfBirth,
				gender: formData.gender,
				occupation: formData.occupation,
				educationLevel: formData.educationLevel,
			});

			console.log(res);
			if (res.status === 200) {
				console.log("User profile created successfully");
				setFormData({
					uid: "",
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					dateOfBirth: "",
					gender: "",
					occupation: "",
					educationLevel: "",
				});
				router.push("/");

				// Display a success message using DaisyUI
				showAlert("success", "User profile created successfully");
			} else {
				console.error("Error creating user profile:", res.data);
				// Display an error message using DaisyUI
				showAlert("error", "Error creating user profile. Please try again.");
			}
		} catch (error) {
			console.error("Error creating user profile:", error);
			// Display an error message using DaisyUI
			showAlert("error", "Error creating user profile. Please try again.");
		}
	};

	// Helper function to display DaisyUI alerts
	const showAlert = (type, message) => {
		const alertContainer = document.createElement("div");
		alertContainer.classList.add("alert", `alert-${type}`);
		alertContainer.innerHTML = `
			<div>
				<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>${message}</span>
			</div>
		`;

		// Append the alert to the document body or a specific container element
		document.body.appendChild(alertContainer);

		// Remove the alert after 3 seconds
		setTimeout(() => {
			alertContainer.remove();
		}, 3000);
	};

	return (
		<div className="bg-base-200">
			<Navbar />
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">User Profile</h1>
						<p className="py-6">
							Please fill in your profile information to help us personalize
							your experience.
						</p>
					</div>
					<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<form onSubmit={handleSubmit} className="card-body">
							<div className="form-control">
								<label className="label" htmlFor="firstName">
									<span className="label-text">First Name</span>
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									required
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="lastName">
									<span className="label-text">Last Name</span>
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									required
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="email">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="phoneNumber">
									<span className="label-text">Phone Number</span>
								</label>
								<input
									type="tel"
									id="phoneNumber"
									name="phoneNumber"
									value={formData.phoneNumber}
									onChange={handleChange}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="dateOfBirth">
									<span className="label-text">Date of Birth</span>
								</label>
								<input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleChange}
									required
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="gender">
									<span className="label-text">Gender</span>
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									required
									className="select select-bordered w-full"
								>
									<option value="">Select Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
									<option value="prefer-not-to-say">Prefer not to say</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="occupation">
									<span className="label-text">Occupation</span>
								</label>
								<input
									type="text"
									id="occupation"
									name="occupation"
									value={formData.occupation}
									onChange={handleChange}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label" htmlFor="educationLevel">
									<span className="label-text">Highest Education Level</span>
								</label>
								<select
									id="educationLevel"
									name="educationLevel"
									value={formData.educationLevel}
									onChange={handleChange}
									className="select select-bordered w-full"
								>
									<option value="">Select Education Level</option>
									<option value="high-school">High School</option>
									<option value="bachelors">Bachelor's Degree</option>
									<option value="masters">Master's Degree</option>
									<option value="phd">Ph.D.</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary">
									Save Profile
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
