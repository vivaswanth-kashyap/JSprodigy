import axios from "axios";
import Navbar from "../components/Navbar";

const Course = ({ course }) => {
	// return (
	// 	<div className="min-h-screen bg-base-200">
	// 		<Navbar />
	// 		<div className="max-w-4xl mx-auto py-8 mt-16">
	// 			<div className="card bg-base-100 shadow-xl">
	// 				<div className="card-body">
	// 					<h1 className="card-title text-4xl font-bold mb-4">
	// 						{course.title}
	// 					</h1>
	// 					<p className="text-lg mb-8">{course.description}</p>
	// 					{/* {course.videos && course.videos.length > 0 ? (
	//             <div className="grid grid-cols-1 gap-8">
	//               {course.videos.map((video) => (
	//                 <div key={video.id} className="card bg-base-200 shadow-md">
	//                   <div className="card-body">
	//                     <h2 className="card-title text-2xl font-semibold mb-4">
	//                       {video.title}
	//                     </h2>
	//                     <div className="aspect-w-16 aspect-h-9">
	//                       <iframe
	//                         src={`https://player.vimeo.com/video/${video.id}`}
	//                         frameBorder="0"
	//                         allowFullScreen
	//                       ></iframe>
	//                     </div>
	//                   </div>
	//                 </div>
	//               ))}
	//             </div>
	//           ) : (
	//             <div className="text-lg text-gray-500">No videos available</div>
	//           )} */}
	// 					<div className="aspect-w-16 aspect-h-9">
	// 						<iframe
	// 							src="https://player.vimeo.com/video/965167835?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
	// 							width="720"
	// 							height="720"
	// 							frameBorder="0"
	// 							allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
	// 							title="Vimeo Test 1"
	// 						></iframe>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="max-w-4xl mx-auto py-16">
				<div className="card bg-base-100 shadow-xl">
					<div className="card-body">
						<h1 className="card-title text-5xl font-bold mb-4 text-center">
							{course.title}
						</h1>
						<p className="text-xl mb-8 text-center">{course.description}</p>
						<div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
							<iframe
								src="https://player.vimeo.com/video/965167835?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
								width="800"
								height="600"
								frameBorder="0"
								allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
								title="Vimeo Test 1"
							></iframe>
						</div>
						<div className="mt-8 text-center">
							<button className="btn btn-primary btn-lg">Start Learning</button>
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

		// Initialize videos as an empty array
		course.videos = [];

		// Check if videoIds exists and is an array
		if (course.videoIds && Array.isArray(course.videoIds)) {
			// Fetch video details from the Vimeo API
			const videoIds = course.videoIds;
			const vimeoAccessToken = "9f940685c9ab7e2bf7983647a2c1cb4b";

			for (const videoId of videoIds) {
				try {
					const videoResponse = await axios.get(
						`https://api.vimeo.com/videos/${videoId}`,
						{
							headers: {
								Authorization: `Bearer ${vimeoAccessToken}`,
							},
						}
					);
					course.videos.push(videoResponse.data);
				} catch (error) {
					console.error(
						`Failed to fetch video details for videoId: ${videoId}`,
						error
					);
				}
			}
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
				course: {
					title: "Course not found",
					description: "Unable to fetch course details.",
					videos: [],
				},
			},
		};
	}
}
