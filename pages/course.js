import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Link from "next/link";
import VimeoPlayer from "../components/VimeoPlayer"; // Make sure to create this file in the same directory

const API_URL = "https://api.jsprodigy.com" || "http://localhost:4000";

const Course = ({ course }) => {
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [videoId, setVideoId] = useState(null);
	const [error, setError] = useState(null);

	const handleVideoSelect = async (video) => {
		setSelectedVideo(video);
		setError(null);
		try {
			const response = await axios.get(
				`${API_URL}/videos/${encodeURIComponent(video.key)}`
			);
			setVideoId(response.data.id);
		} catch (error) {
			console.error("Failed to fetch video details:", error);
			setVideoId(null);
			setError("Failed to load video. Please try again later.");
		}
	};

	useEffect(() => {
		if (course.videos && course.videos.length > 0) {
			handleVideoSelect(course.videos[0]);
		}
	}, [course.videos]);

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="lg:col-span-2 space-y-8">
						<h1 className="text-4xl font-bold text-base-content mb-2">
							{course.title}
						</h1>
						<p className="text-xl text-base-content opacity-70 mb-6">
							{course.description}
						</p>
						<div className="rounded-xl overflow-hidden shadow-2xl bg-base-300">
							{videoId ? (
								<VimeoPlayer videoId={videoId} />
							) : error ? (
								<div className="flex items-center justify-center h-64">
									<p className="text-error text-center p-4">{error}</p>
								</div>
							) : (
								<div className="flex items-center justify-center h-64">
									<p className="text-base-content opacity-70">
										Loading video...
									</p>
								</div>
							)}
						</div>
						{selectedVideo && (
							<h2 className="text-2xl font-semibold text-base-content mt-6">
								{selectedVideo.name}
							</h2>
						)}
					</div>
					<div className="bg-base-100 p-6 rounded-xl shadow-lg">
						<h2 className="text-2xl font-bold text-base-content mb-4">
							Video List
						</h2>
						<ul className="space-y-2">
							{course.videos.map((video) => (
								<li
									key={video.key}
									className={`cursor-pointer hover:bg-base-200 p-3 rounded-lg transition duration-150 ease-in-out ${
										selectedVideo && selectedVideo.key === video.key
											? "bg-primary text-primary-content"
											: "text-base-content"
									}`}
									onClick={() => handleVideoSelect(video)}
								>
									{video.name}
								</li>
							))}
						</ul>
						<div className="mt-8">
							<Link href="/curriculum">
								<button className="btn btn-primary btn-block">
									Start Learning
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Course;

// ... rest of the code remains the same

export async function getServerSideProps() {
	try {
		console.log("Fetching course data from:", `${API_URL}/course`);
		const response = await axios.get(`${API_URL}/course`);
		console.log("Course data received:", response.data);

		return {
			props: {
				course: response.data,
			},
		};
	} catch (error) {
		console.error("Failed to fetch data:", error.message);
		console.error(
			"Error details:",
			error.response ? error.response.data : "No response data"
		);
		return {
			props: {
				course: {
					title: "Course not found",
					description: "Unable to fetch course details.",
					videos: [],
				},
			},
		};
	}
}
