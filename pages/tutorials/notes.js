import { useState, useEffect } from "react";
import Head from "next/head";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Notes({ initialPdfs, error }) {
	const [user, setUser] = useState(null);
	const [pdfs, setPdfs] = useState(initialPdfs);
	const [loading, setLoading] = useState(true);
	const [selectedPdf, setSelectedPdf] = useState(null);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const handleView = (pdf) => {
		setSelectedPdf(pdf);
	};

	const handleDownload = (pdf) => {
		const link = document.createElement("a");
		link.href = pdf.url;
		link.download = pdf.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (loading) {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div className="container flex justify-center my-72 mx-auto">
					<span className="loading loading-dots loading-lg"></span>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-base-100 min-h-screen">
			<Head>
				<title>Course Notes - Full Stack Web Development</title>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<Navbar />
			<main className="container mx-auto px-4 py-16">
				<h1 className="text-4xl font-bold mb-8">Course Notes</h1>
				{error ? (
					<div className="alert alert-error">
						<p>Error fetching PDFs: {error}</p>
					</div>
				) : pdfs.length === 0 ? (
					<p>No notes available at the moment. (Total PDFs: {pdfs.length})</p>
				) : (
					<div className="flex">
						<div className="w-1/3 pr-4">
							<p className="mb-4">Total PDFs available: {pdfs.length}</p>
							<div className="space-y-4">
								{pdfs.map((pdf, index) => (
									<div key={index} className="card bg-base-200 shadow-xl">
										<div className="card-body">
											<h2 className="card-title">{pdf.name}</h2>
											<p>
												Uploaded on:{" "}
												{new Date(pdf.lastModified).toLocaleDateString()}
											</p>
											<div className="card-actions justify-end">
												<button
													onClick={() => handleView(pdf)}
													className="btn btn-primary"
												>
													View
												</button>
												<button
													onClick={() => handleDownload(pdf)}
													className="btn btn-secondary"
												>
													Download
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="w-2/3 pl-4">
							{selectedPdf && (
								<iframe
									src={selectedPdf.url}
									className="w-full h-screen"
									title={selectedPdf.name}
								/>
							)}
						</div>
					</div>
				)}
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

export async function getServerSideProps(context) {
	try {
		const response = await axios.get("http://localhost:4000/upload/getpdfs");
		const pdfs = response.data;
		return {
			props: {
				initialPdfs: pdfs,
				error: null,
			},
		};
	} catch (error) {
		console.error("Error fetching PDFs:", error);
		let errorMessage = "An error occurred while fetching PDFs";
		if (error.response) {
			console.error("Data:", error.response.data);
			console.error("Status:", error.response.status);
			console.error("Headers:", error.response.headers);
			errorMessage = `Server responded with status ${error.response.status}: ${
				error.response.data.error || JSON.stringify(error.response.data)
			}`;
		} else if (error.request) {
			console.error("Request:", error.request);
			errorMessage = "No response received from server";
		} else {
			console.error("Error:", error.message);
			errorMessage = error.message;
		}
		return {
			props: {
				initialPdfs: [],
				error: errorMessage,
			},
		};
	}
}
