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
					<h1 className="text-5xl font-bold mb-8 text-center">Enroll Now</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-base-100 shadow-xl rounded-lg p-8">
							<h2 className="text-3xl font-semibold underline underline-offset-4 mb-4 text-center">
								Core Course
							</h2>
							<ul className="list-disc list-inside text-balance text-xl text-base-content space-y-2 mb-6">
								<li>Back-end Fundamentals</li>
								<li>Databases</li>
								<li>Web Development Fundamentals</li>
								<li>Front-end Basics</li>
								<li>Advanced Front-end</li>
								<li>React and Modern Front-end</li>
							</ul>
							<div className="flex flex-col items-center justify-center mb-6">
								<span className="text-4xl font-bold text-gray-500 line-through mb-2">
									₹7,999
								</span>
								<span className="text-5xl font-bold text-primary mb-2">
									₹2,999
								</span>
								<span className="badge badge-secondary">
									Early Bird Discount
								</span>
							</div>
							<div className="text-center">
								<Link href="/payments?course=core">
									<button className="btn btn-primary btn-lg">Enroll Now</button>
								</Link>
							</div>
						</div>
						<div className="bg-base-100 shadow-xl rounded-lg p-8">
							<h2 className="text-3xl font-semibold underline underline-offset-4 mb-4 text-center">
								Pro Course
							</h2>
							<ul className="list-disc list-inside text-xl text-base-content space-y-2 mb-6">
								<li>Everything in Core Course</li>
								<li>Advanced Back-end</li>
								<li>Advanced Frameworks and Technologies</li>
								<li>Containerization and Orchestration</li>
								<li>Deployment and Hosting</li>
							</ul>
							<div className="flex flex-col items-center justify-center mb-6">
								<span className="text-4xl font-bold text-gray-500 line-through mb-2">
									₹11,999
								</span>
								<span className="text-5xl font-bold text-primary mb-2">
									₹4,999
								</span>
								<span className="badge badge-secondary">
									Early Bird Discount
								</span>
							</div>
							<div className="text-center">
								<Link href="/payments?course=pro">
									<button className="btn btn-primary btn-lg">Enroll Now</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="mt-8 text-center">
						<Link href="/curriculum">
							<button className="btn btn-outline btn-primary btn-lg">
								View Full Curriculum
							</button>
						</Link>
					</div>
					<div className="bg-base-100 shadow-xl rounded-lg p-8 mt-8">
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
