import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Enroll() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
			<Head>
				<title>Enroll Now | Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="container mx-auto py-16 px-4">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-5xl font-bold mb-8 text-center text-primary-content">
						Enroll Now
					</h1>
					<div className="bg-base-100 shadow-xl rounded-lg p-8 mb-8">
						<h2 className="text-3xl font-semibold mb-4 text-center">
							Course Pricing
						</h2>
						<div className="flex flex-col md:flex-row items-center justify-center mb-8">
							<span className="text-4xl font-bold text-gray-500 line-through mr-4 mb-2 md:mb-0">
								₹11,999
							</span>
							<span className="text-5xl font-bold text-primary mb-2 md:mb-0">
								₹4,999
							</span>
							<span className="badge badge-secondary ml-4">
								Early Bird Discount
							</span>
						</div>
						<p className="text-xl text-base-content mb-8 text-center">
							Take advantage of our early bird discount and enroll now to start
							your journey in Full Stack Web Development with JavaScript!
						</p>
						<div className="flex justify-center space-x-4">
							<Link href="/curriculum">
								<button className="btn btn-outline btn-primary btn-lg">
									View Curriculum
								</button>
							</Link>
							<button className="btn btn-primary btn-lg">Enroll Now</button>
						</div>
					</div>
					<div className="bg-base-100 shadow-xl rounded-lg p-8">
						<h2 className="text-3xl font-semibold mb-4 text-center">
							Why Choose Our Course?
						</h2>
						<ul className="list-disc list-inside text-xl text-base-content space-y-4">
							<li>
								Comprehensive curriculum covering all aspects of Full Stack Web
								Development
							</li>
							<li>Hands-on projects and practical coding exercises</li>
							<li>Expert instructors with industry experience</li>
							<li>2 years access to course materials and resources</li>
							<li>Community support and networking opportunities</li>
						</ul>
					</div>
				</div>
			</main>
			<footer className="bg-base-300 py-8 text-center">
				<p className="text-base-content">
					© {new Date().getFullYear()} Full Stack Web Development with
					JavaScript. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
