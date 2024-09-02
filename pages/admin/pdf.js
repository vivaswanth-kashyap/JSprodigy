import { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import axios from "axios";

export default function PDFUpload() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [file, setFile] = useState(null);
	const [uploadStatus, setUploadStatus] = useState("");

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			setUploadStatus("Please select a file");
			return;
		}

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			setUploadStatus("Uploading...");
			const token = await user.getIdToken();
			const response = await axios.post(
				"http://localhost:4000/upload/pdf",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUploadStatus("PDF uploaded successfully!");
		} catch (error) {
			console.error("Error uploading PDF:", error);
			setUploadStatus("Error uploading PDF. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div className="container flex justify-center my-72 mx-auto">
					<span className="loading loading-dots loading-lg"></span>
					<span className="loading loading-dots loading-lg"></span>
				</div>
			</div>
		);
	}

	if (!user || !user.email.endsWith("@gmail.com")) {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div className="container mx-auto px-4 py-16">
					<h1 className="text-3xl font-bold mb-4">Access Denied</h1>
					<p>You do not have permission to access this page.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-base-100">
			<Head>
				<title>Upload PDF - Admin Dashboard</title>
				<link rel="icon" href="/logo.svg" />
			</Head>

			<Navbar />

			<main className="container mx-auto px-4 py-16 min-h-screen">
				<h1 className="text-4xl font-bold mb-8">Upload PDF</h1>
				<div className="bg-base-200 p-8 rounded-lg shadow-xl">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="pdf-upload"
								className="block text-lg font-medium mb-2"
							>
								Select PDF file
							</label>
							<input
								type="file"
								id="pdf-upload"
								accept=".pdf"
								onChange={handleFileChange}
								className="file-input file-input-bordered file-input-primary w-full"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Upload PDF
						</button>
					</form>
					{uploadStatus && (
						<div
							className={`mt-4 p-4 rounded-lg ${
								uploadStatus.includes("Error")
									? "bg-error text-error-content"
									: "bg-success text-success-content"
							}`}
						>
							{uploadStatus}
						</div>
					)}
				</div>
			</main>

			<footer className="bg-neutral text-neutral-content py-8 mt-16">
				<div className="container mx-auto px-4">
					<p className="text-center">
						&copy; {new Date().getFullYear()} Full Stack Web Development with
						JavaScript. All rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
