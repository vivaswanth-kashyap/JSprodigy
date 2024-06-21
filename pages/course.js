import axios from "axios";
import Navbar from "../components/Navbar";

const Course = ({ course }) => {
	if (!course) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-2xl font-semibold text-gray-500">
					Course not found
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="max-w-4xl mx-auto py-8 mt-16">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h1 className="card-title text-4xl font-bold mb-4">
							{course.title}
						</h1>
						<p className="text-lg mb-8">{course.description}</p>
						<div className="grid grid-cols-1 gap-8">
							{course.videos.map((video) => (
								<div key={video.id} className="card bg-base-200 shadow-md">
									<div className="card-body">
										<h2 className="card-title text-2xl font-semibold mb-4">
											{video.title}
										</h2>
										<div className="aspect-w-16 aspect-h-9">
											<iframe
												src={`https://player.vimeo.com/video/${video.id}`}
												frameBorder="0"
												allowFullScreen
											></iframe>
										</div>
									</div>
								</div>
							))}
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
		// Fetch course details from your API or database
		const courseResponse = await axios.get(`https://api.jsprodigy.com/course`);
		const course = courseResponse.data;

		// Check if videoIds exists and is an array
		if (course.videoIds && Array.isArray(course.videoIds)) {
			// Fetch video details from the Vimeo API
			const videoIds = course.videoIds;
			const vimeoAccessToken = "Yab3dc12016a5687d144804d1688c87b4";
			const videos = [];

			for (const videoId of videoIds) {
				const videoResponse = await axios.get(
					`https://api.vimeo.com/videos/${videoId}`,
					{
						headers: {
							Authorization: `Bearer ${vimeoAccessToken}`,
						},
					}
				);
				videos.push(videoResponse.data);
			}

			course.videos = videos;
		} else {
			course.videos = []; // Set videos to an empty array if videoIds doesn't exist or is not an array
		}

		return {
			props: {
				course,
			},
		};
	} catch (error) {
		console.error("Failed to fetch course data:", error);
		return {
			props: {
				course: null,
			},
		};
	}
}
