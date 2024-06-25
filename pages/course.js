import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Link from "next/link";

const API_URL = "https://api.jsprodigy.com" || "http://localhost:3000";

const Course = ({ course }) => {
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [videoUrl, setVideoUrl] = useState(null);
	const [error, setError] = useState(null);
	const videoRef = useRef(null);

	const handleVideoSelect = async (video) => {
		setSelectedVideo(video);
		setError(null);
		try {
			const response = await axios.get(
				`${API_URL}/videos/${encodeURIComponent(video.key)}`
			);
			console.log("Fetched video URL:", response.data.url);
			setVideoUrl(response.data.url);
		} catch (error) {
			console.error("Failed to fetch video URL:", error);
			setVideoUrl(null);
			setError("Failed to load video. Please try again later.");
		}
	};

	useEffect(() => {
		if (course.videos && course.videos.length > 0) {
			handleVideoSelect(course.videos[0]);
		}
	}, [course.videos]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
			<Navbar />
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<h1 className="text-5xl font-extrabold mb-4">{course.title}</h1>
						<p className="text-xl text-base-content mb-8">
							{course.description}
						</p>
						<div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl mb-8">
							{videoUrl ? (
								<video
									ref={videoRef}
									src={videoUrl}
									controls
									playsInline
									className="absolute top-0 left-0 w-full h-full"
									onError={(e) => {
										console.error("Video error:", e);
										setError("Failed to play video. Please try again later.");
									}}
								>
									Your browser does not support the video tag.
								</video>
							) : error ? (
								<p className="text-center py-20 text-red-500">{error}</p>
							) : (
								<p className="text-center py-20">No video selected</p>
							)}
						</div>
						{selectedVideo && (
							<h2 className="text-2xl font-bold mb-4">{selectedVideo.key}</h2>
						)}
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-4">Video List</h2>
						<ul className="space-y-2">
							{course.videos.map((video) => (
								<li
									key={video.key}
									className={`cursor-pointer hover:bg-base-300 p-2 rounded ${
										selectedVideo && selectedVideo.key === video.key
											? "bg-base-300"
											: ""
									}`}
									onClick={() => handleVideoSelect(video)}
								>
									{video.key}
								</li>
							))}
						</ul>
						<div className="mt-8">
							<Link href={`/curriculum`}>
								<button className="btn btn-primary btn-lg px-8 py-4 rounded-full text-white hover:scale-105 transition-transform duration-300">
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
