// pages/signup.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	doSignUp,
	doSocialSignIn,
	getAccessToken,
} from "../firebase/FirebaseFunctions";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "../components/Navbar";
import axios from "axios";

const SignUpPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const { user } = useAuth();
	const auth = getAuth();
	const currentUser = auth.currentUser;
	console.log(currentUser);
	useEffect(() => {
		if (currentUser) {
			router.push("/");
		}
	}, [user]);

	const handleEmailSignUp = async (e) => {
		e.preventDefault();
		try {
			await doSignUp(email, password);
			const token = await getAccessToken();
			const auth = getAuth();
			const currentUser = auth.currentUser;
			const uid = currentUser ? currentUser.uid : null;
			await callBackendAPI(token, uid);
			router.push("/userDetails");
		} catch (error) {
			setError(error.message);
		}
	};

	const handleSocialSignIn = async () => {
		try {
			await doSocialSignIn();
			const token = await getAccessToken();
			const auth = getAuth();
			const currentUser = auth.currentUser;
			const uid = currentUser ? currentUser.uid : null;
			await callBackendAPI(token, uid);
			router.push("/userDetails");
		} catch (error) {
			setError(error.message);
		}
	};

	const callBackendAPI = async (token, uid) => {
		if (!uid) {
			console.log("uid is undefined");
			return;
		}
		try {
			const response = await axios.post(
				`https://13.60.18.244:4000/users/${uid}`,
				null,
				{
					headers: {
						ContentType: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// Include any necessary request body data

			console.log(response);
			if (response.status === 200) {
				// Handle successful response from the backend
				const data = response.data;
				console.log("Backend response:", data);
			} else {
				// Handle error response from the backend
				console.error("Backend API error:", response.status);
			}
		} catch (error) {
			console.error("Error calling backend API:", error);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="flex items-center justify-center min-h-screen">
				<div className="card w-96 bg-base-100 shadow-xl">
					<div className="card-body">
						<h2 className="card-title justify-center">Sign Up</h2>
						{error && (
							<div className="alert alert-error shadow-lg">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>{error}</span>
								</div>
							</div>
						)}
						<form onSubmit={handleEmailSignUp}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary">
									Sign Up
								</button>
							</div>
						</form>
						<div className="divider">OR</div>
						<button onClick={handleSocialSignIn} className="btn btn-outline">
							Sign up with Google
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
