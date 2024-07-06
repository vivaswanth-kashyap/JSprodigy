import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [courseAccess, setCourseAccess] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user) {
				try {
					const response = await axios.get(
						`https://api.jsprodigy.com/users/${user.uid}`
					);
					setCourseAccess(response.data.courseAccess);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, [user]);

	if (loading) {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div className="container flex justify-center my-72 mx-auto">
					<span className="loading loading-dots loading-lg"></span>
					<span className="loading loading-dots loading-lg"></span>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-base-100 min-h-screen">
			<Head>
				<title>Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/logo.svg" />
			</Head>

			<Navbar />

			<main>
				<section className="bg-gradient-to-r from-primary to-secondary text-white py-20 shadow-3xl mx-auto">
					<div className="container mx-auto px-4">
						<h1 className="text-4xl font-bold mb-4">
							Master Full Stack Web Development with JavaScript
						</h1>
						<p className="text-xl mb-8">
							Learn to build powerful web applications using Node.js, Express,
							React, Next.js, MongoDB, Redis, and GraphQL.
						</p>
						{user && courseAccess ? (
							<div>
								<p className="text-2xl font-semibold mb-4">
									Welcome back! Ready to continue your learning journey?
								</p>
								<Link href="/dashboard">
									<button className="btn btn-outline text-white font-semibold py-3 px-8 rounded-full shadow-lg">
										Go to Dashboard
									</button>
								</Link>
							</div>
						) : (
							<div>
								<div className="mb-8">
									<p className="text-2xl font-semibold mb-4">
										New Batch Starting from July 1st!
									</p>
									<ul className="list-disc pl-8 text-lg space-y-2">
										<li>On demand course videos</li>
										<li>New videos every Wednesday & Saturday </li>
										<li>Live 24/7 Doubt Support</li>
									</ul>
								</div>
								<Link href="/enroll">
									<button className="btn btn-outline text-white font-semibold py-3 px-8 rounded-full shadow-lg">
										Enroll Now
									</button>
								</Link>
							</div>
						)}
					</div>
				</section>

				<section className="container mx-auto py-16 px-4">
					<div className="bg-base-200 text-base-content rounded-lg shadow-2xl overflow-hidden">
						<div className="flex flex-col lg:flex-row items-center">
							<div className="lg:w-1/2 p-8">
								<h2 className="text-4xl font-bold mb-6 text-primary">
									AI-Powered Learning Experience
								</h2>
								<p className="text-xl mb-8">
									Enhance your learning with our cutting-edge AI technologies,
									providing personalized support and code analysis.
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-base-100 p-6 rounded-lg shadow-md">
										<h3 className="text-2xl font-semibold mb-4 text-secondary">
											Community Support
										</h3>
										<ul className="space-y-3">
											<li className="flex items-center">
												<svg
													className="w-6 h-6 mr-2 text-accent"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>24/7 AI-powered doubt resolution</span>
											</li>
											<li className="flex items-center">
												<svg
													className="w-6 h-6 mr-2 text-accent"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Instant responses to your questions</span>
											</li>
										</ul>
									</div>

									<div className="bg-base-100 p-6 rounded-lg shadow-md">
										<h3 className="text-2xl font-semibold mb-4 text-secondary">
											Code Analysis
										</h3>
										<ul className="space-y-3">
											<li className="flex items-center">
												<svg
													className="w-6 h-6 mr-2 text-accent"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Get instant feedback on your code</span>
											</li>
											<li className="flex items-center">
												<svg
													className="w-6 h-6 mr-2 text-accent"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Learn best practices and standards</span>
											</li>
										</ul>
									</div>
								</div>

								<div className="mt-8 flex flex-wrap gap-4">
									{user && courseAccess ? (
										<>
											<Link href="/doubts">
												<button className="btn btn-primary">
													Try Community Support
												</button>
											</Link>
											<Link href="/practice">
												<button className="btn btn-secondary">
													Try Code Analysis
												</button>
											</Link>
										</>
									) : (
										<div
											className="tooltip"
											data-tip="Enroll to access these features"
										>
											<button className="btn btn-disabled" disabled>
												Access AI Features
											</button>
										</div>
									)}
								</div>
							</div>

							<div className="lg:w-1/2 p-8">
								<img
									src="/ai-features.svg"
									alt="AI-powered learning features"
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				</section>

				<section className="container mx-auto py-16 px-4">
					<h2 className="text-3xl font-semibold mb-8">What You'll Learn</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/react.svg"
									alt="React"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">React</h3>
								<p>Build dynamic and interactive user interfaces with React.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/nodejs.svg"
									alt="Node.js"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Node.js</h3>
								<p>Develop server-side applications using Node.js.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/nextjs.svg"
									alt="Next.js"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Next.js</h3>
								<p>Build server-rendered React applications with Next.js.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/firebase.svg"
									alt="Firebase"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Firebase</h3>
								<p>
									Integrate Firebase services for authentication, database, and
									more.
								</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/graphql.svg"
									alt="GraphQL"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">GraphQL</h3>
								<p>Learn to build efficient and flexible APIs using GraphQL.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/mongodb.svg"
									alt="MongoDB"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">MongoDB</h3>
								<p>Store and retrieve data using MongoDB.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/redis.svg"
									alt="Redis"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Redis</h3>
								<p>Optimize application performance with Redis caching.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/tailwindcss.svg"
									alt="Tailwind CSS"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Tailwind CSS</h3>
								<p>Style your applications rapidly with Tailwind CSS.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img src="/aws.svg" alt="AWS" className="h-12 w-auto mb-4" />
								<h3 className="card-title">AWS</h3>
								<p>Deploy and scale your applications using AWS services.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/netlify.svg"
									alt="Netlify"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Netlify</h3>
								<p>
									Deploy your static websites and serverless functions with
									Netlify.
								</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/docker.svg"
									alt="Docker"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Docker</h3>
								<p>Package and deploy applications using Docker containers.</p>
							</div>
						</div>
						<div className="card glass shadow-xl">
							<div className="card-body items-center text-center">
								<img
									src="/kubernetes.svg"
									alt="Kubernetes"
									className="h-12 w-auto mb-4"
								/>
								<h3 className="card-title">Kubernetes</h3>
								<p>
									Manage and orchestrate containerized applications with
									Kubernetes.
								</p>
							</div>
						</div>
					</div>
				</section>

				{user && courseAccess && (
					<section className="container mx-auto py-16 px-4">
						<h2 className="text-3xl font-semibold mb-8">Your Progress</h2>
						<div className="bg-base-200 p-6 rounded-lg shadow-lg">
							<p className="text-xl mb-4">
								You're making great progress! Don't forget to check out our
								latest modules.
							</p>
							<Link href="/dashboard">
								<button className="btn btn-primary">Continue Learning</button>
							</Link>
						</div>
					</section>
				)}

				<section className="bg-base-200 py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-4xl font-bold mb-8 text-center">
							Course Curriculum
						</h2>
						<div className="text-center mb-8">
							<p>
								Our comprehensive curriculum covers a wide range of topics to
								equip you with the skills and knowledge needed to excel in the
								field of web development.
							</p>
						</div>
						<div className="text-center">
							<Link href="/curriculum">
								<button className="btn btn-outline">View Curriculum</button>
							</Link>
						</div>
					</div>
				</section>
			</main>

			<footer className="bg-neutral text-neutral-content py-8">
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
