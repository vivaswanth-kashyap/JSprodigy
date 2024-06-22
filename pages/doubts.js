import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";

export default function Community({ doubts }) {
	const [newDoubt, setNewDoubt] = useState("");
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const uid = currentUser ? currentUser.uid : null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("https://api.jsprodigy.com/doubts", {
				uid,
				doubt: newDoubt,
			});
			console.log(response.data);
			setNewDoubt("");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="container mx-auto py-8">
				<div className="text-center">
					<h1 className="text-5xl font-bold mb-4">Community Page</h1>
					<p className="text-xl text-gray-600 mb-8">
						Ask doubts, get answers, and engage in meaningful discussions.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-2xl">Ask a Doubt</h2>
							<form onSubmit={handleSubmit}>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Enter your doubt:</span>
									</label>
									<textarea
										className="textarea textarea-bordered h-24"
										value={newDoubt}
										onChange={(e) => setNewDoubt(e.target.value)}
										placeholder="Type your doubt here..."
									></textarea>
								</div>
								<div className="card-actions justify-end mt-4">
									<button className="btn btn-primary">Ask</button>
								</div>
							</form>
						</div>
					</div>
					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-2xl">Recent Doubts</h2>
							<ul className="space-y-4">
								{doubts.map((doubt, index) => (
									<li key={index} className="card bg-white shadow-md">
										<div className="card-body">
											<p className="text-lg">{doubt.doubt}</p>
											<div className="card-actions justify-end">
												<button className="btn btn-outline btn-primary btn-sm">
													Reply
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const response = await axios.get("https://api.jsprodigy.com/doubts");
		const doubts = response.data;
		return {
			props: {
				doubts,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				doubts: [],
			},
		};
	}
}
