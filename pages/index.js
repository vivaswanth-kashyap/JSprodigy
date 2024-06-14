// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Head>
				<title>Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/logo.svg" />
			</Head>

			<header className="bg-white shadow">
				<div className="container mx-auto py-6 px-4">
					<nav className="flex items-center justify-between">
						<div className="flex items-center">
							<img src="/logo.svg" alt="Logo" className="h-8 w-auto mr-2" />
							<span className="font-semibold text-xl">jsProdigy</span>
						</div>
						<div>
							<Link href="/enroll">
								<button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
									Enroll Now
								</button>
							</Link>
						</div>
					</nav>
				</div>
			</header>

			<main>
				<section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
					<div className="container mx-auto px-4">
						<h1 className="text-4xl font-bold mb-4">
							Master Full Stack Web Development with JavaScript
						</h1>
						<p className="text-xl mb-8">
							Learn to build powerful web applications using Node.js, Express,
							React, Next.js, MongoDB, Redis, and GraphQL.
						</p>
						<Link href="/enroll">
							<button className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full shadow-lg">
								Enroll Now
							</button>
						</Link>
					</div>
				</section>

				<section className="container mx-auto py-16 px-4">
					<h2 className="text-3xl font-semibold mb-8">What You'll Learn</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white rounded-lg shadow-md p-6">
							<img src="/react.svg" alt="React" className="h-12 w-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">React</h3>
							<p>Build dynamic and interactive user interfaces with React.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/nodejs.svg"
								alt="Node.js"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">Node.js</h3>
							<p>Develop server-side applications using Node.js.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/nextjs.svg"
								alt="Next.js"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">Next.js</h3>
							<p>Build server-rendered React applications with Next.js.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/firebase.svg"
								alt="Firebase"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">Firebase</h3>
							<p>
								Integrate Firebase services for authentication, database, and
								more.
							</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/graphql.svg"
								alt="GraphQL"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">GraphQL</h3>
							<p>Learn to build efficient and flexible APIs using GraphQL.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/mongodb.svg"
								alt="MongoDB"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">MongoDB</h3>
							<p>Store and retrieve data using MongoDB.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img src="/redis.svg" alt="Redis" className="h-12 w-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">Redis</h3>
							<p>Optimize application performance with Redis caching.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/tailwindcss.svg"
								alt="Tailwind CSS"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">Tailwind CSS</h3>
							<p>Style your applications rapidly with Tailwind CSS.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img src="/aws.svg" alt="AWS" className="h-12 w-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">AWS</h3>
							<p>Deploy and scale your applications using AWS services.</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<img
								src="/netlify.svg"
								alt="Netlify"
								className="h-12 w-auto mb-4"
							/>
							<h3 className="text-xl font-semibold mb-2">Netlify</h3>
							<p>
								Deploy your static websites and serverless functions with
								Netlify.
							</p>
						</div>
					</div>
				</section>

				<section className="bg-gray-200 py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-semibold mb-8">Course Highlights</h2>
						<ul className="list-disc pl-8">
							<li className="mb-4">
								Comprehensive curriculum covering a wide range of technologies
							</li>
							<li className="mb-4">
								Hands-on projects and practical coding exercises
							</li>
							{/* <li className="mb-4">
								Expert instruction from industry professionals
							</li>
							<li>Lifetime access to course materials and updates</li> */}
						</ul>
					</div>
				</section>

				{/* <section className="container mx-auto py-16 px-4">
					<h2 className="text-3xl font-semibold mb-8">Testimonials</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-white rounded-lg shadow-md p-6">
							<p className="text-lg mb-4">
								"This course exceeded my expectations. I learned so much and
								feel confident in my abilities as a full stack developer now."
							</p>
							<p className="font-semibold">- John Doe</p>
						</div>
						<div className="bg-white rounded-lg shadow-md p-6">
							<p className="text-lg mb-4">
								"The projects in this course were challenging but rewarding. I
								built a solid portfolio and landed my dream job after completing
								it."
							</p>
							<p className="font-semibold">- Jane Smith</p>
						</div>
					</div>
				</section> */}
			</main>

			<footer className="bg-gray-800 text-white py-8">
				<div className="container mx-auto px-4">
					<p className="text-center">
						&copy; 2023 Full Stack Web Development with JavaScript. All rights
						reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
