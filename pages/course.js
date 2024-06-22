import axios from "axios";
import Navbar from "../components/Navbar";
import Link from "next/link";

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
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
			<Navbar />
			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-16">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="lg:pr-10">
						<h1 className="text-5xl font-extrabold mb-4">{course.title}</h1>
						<p className="text-xl text-base-content mb-8">
							{course.description}
						</p>
						<div className="mt-8">
							<Link href={`/curriculum`}>
								<button className="btn btn-primary btn-lg px-8 py-4 rounded-full text-white hover:scale-105 transition-transform duration-300">
									Start Learning
								</button>
							</Link>
						</div>
					</div>
					<div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
						<iframe
							src="https://player.vimeo.com/video/965167835?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
							width="100%"
							height="100%"
							frameBorder="0"
							allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
							title="Vimeo Test 1"
							className="absolute top-0 left-0 w-full h-full"
						></iframe>
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
