import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VimeoPlayer from "../components/VimeoPlayer";
import VerticalNavbar from "../components/verticalNavbar";

const API_URL = "https://api.jsprodigy.com" || "http://localhost:4000";

const CoursePage = ({ course }) => {
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [videoId, setVideoId] = useState(null);
	const [error, setError] = useState(null);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [courseAccess, setCourseAccess] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user) {
				try {
					const response = await axios.get(`${API_URL}/users/${user.uid}`);
					setCourseAccess(response.data.courseAccess);
				} catch (error) {
					console.error("Error fetching user data:", error);
					setCourseAccess(false);
				}
			}
		};

		fetchUserData();
	}, [user]);

	const handleVideoSelect = async (video, index) => {
		setSelectedVideo(video);
		setCurrentVideoIndex(index);
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

	const handlePreviousVideo = () => {
		if (currentVideoIndex > 0) {
			handleVideoSelect(
				course.videos[currentVideoIndex - 1],
				currentVideoIndex - 1
			);
		}
	};

	const handleNextVideo = () => {
		if (currentVideoIndex < course.videos.length - 1) {
			handleVideoSelect(
				course.videos[currentVideoIndex + 1],
				currentVideoIndex + 1
			);
		}
	};

	useEffect(() => {
		if (course.videos && course.videos.length > 0) {
			handleVideoSelect(course.videos[0], 0);
		}
	}, [course.videos]);

	const formatDuration = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (loading) {
		return (
			<div className="flex h-screen bg-base-100">
				<VerticalNavbar />
				<div className="flex-1 flex justify-center items-center">
					<span className="loading loading-dots loading-lg"></span>
				</div>
			</div>
		);
	}

	if (!courseAccess) {
		return (
			<div className="flex h-screen bg-base-200">
				<VerticalNavbar />
				<div className="flex-1 flex flex-col justify-center items-center">
					<h1 className="text-4xl font-bold text-primary mb-4">
						Access Restricted
					</h1>
					<p className="text-xl text-base-content opacity-70 mb-8">
						Enroll to access the course content
					</p>
					<button
						className="btn btn-primary"
						onClick={() => router.push("/enroll")}
					>
						Enroll Now
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-base-200">
			<VerticalNavbar />
			<div className="flex-1 overflow-auto bg-base-100">
				<div className="container mx-auto px-4 py-8">
					<h1 className="text-3xl font-bold text-base-content mb-2">
						{course.title}
					</h1>
					<p className="text-lg text-base-content/70 mb-8">
						{course.description}
					</p>

					<div className="flex flex-col lg:flex-row gap-8">
						{/* Main Content Area */}
						<div className="w-full lg:w-8/12">
							{/* Video Player */}
							<div className="bg-base-100 rounded-lg shadow-lg overflow-hidden mb-6">
								<div className="aspect-w-16 aspect-h-9">
									{videoId ? (
										<VimeoPlayer videoId={videoId} />
									) : error ? (
										<div className="flex items-center justify-center h-full bg-base-200">
											<p className="text-error text-center p-4">{error}</p>
										</div>
									) : (
										<div className="flex items-center justify-center h-full bg-base-200">
											<span className="loading loading-spinner loading-lg"></span>
										</div>
									)}
								</div>
							</div>

							{/* Video Title and Navigation */}
							{selectedVideo && (
								<div className="mb-6">
									<h2 className="text-2xl font-semibold text-base-content mb-4">
										{selectedVideo.name}
									</h2>
									<div className="flex justify-between items-center">
										<button
											onClick={handlePreviousVideo}
											className="btn btn-outline btn-primary"
											disabled={currentVideoIndex === 0}
										>
											← Previous
										</button>
										<button
											onClick={handleNextVideo}
											className="btn btn-primary"
											disabled={currentVideoIndex === course.videos.length - 1}
										>
											Next →
										</button>
									</div>
								</div>
							)}

							{/* Course Content */}
							<div className="bg-base-100 rounded-lg shadow p-6">
								<h3 className="text-xl font-semibold mb-4 text-base-content">
									Course Content
								</h3>
								<div className="space-y-2">
									{course.videos.map((video, index) => (
										<button
											key={video.key}
											className={`w-full text-left p-3 rounded-lg transition-colors ${
												selectedVideo && selectedVideo.key === video.key
													? "bg-primary text-primary-content"
													: "hover:bg-base-200"
											}`}
											onClick={() => handleVideoSelect(video, index)}
										>
											<div className="flex items-center justify-between">
												<span>
													<span className="font-medium mr-2">{index + 1}.</span>
													{video.name}
												</span>
												<span className="text-sm opacity-70">
													{formatDuration(video.duration)}
												</span>
											</div>
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className="w-full lg:w-4/12">
							<div className="bg-base-100 rounded-lg shadow p-6 sticky top-4">
								<h3 className="text-xl font-semibold mb-4 text-base-content">
									Course Overview
								</h3>
								<ul className="space-y-3">
									<li className="flex items-center text-base-content">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-primary"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
										{course.videos.length} lessons
									</li>
									<li className="flex items-center text-base-content">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2 text-primary"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
												clipRule="evenodd"
											/>
										</svg>
										{formatDuration(
											course.videos.reduce(
												(acc, video) => acc + video.duration,
												0
											)
										)}{" "}
										total length
									</li>
								</ul>
								<div className="mt-6 space-y-2">
									<div className="text-base-content">
										Your progress:{" "}
										{Math.round(
											(currentVideoIndex / (course.videos.length - 1)) * 100
										)}
										%
									</div>
									<progress
										className="progress progress-primary w-full"
										value={currentVideoIndex}
										max={course.videos.length - 1}
									></progress>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursePage;

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
