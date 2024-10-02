import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, Code, Server, Database, Cloud } from "lucide-react";

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
				<link rel="icon" className="text-4xl" href="/newLogo.svg" />
			</Head>

			<Navbar />

			<main>
				<section className="bg-gradient-to-r from-primary to-secondary text-white py-12 md:py-24 relative overflow-hidden">
					<div className="absolute inset-0 opacity-10">
						<img
							src="/hero-pattern.svg"
							alt="Background Pattern"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="container mx-auto px-4 relative z-10">
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center"
						>
							Master Full Stack Web Development
						</motion.h1>
						<div className="max-w-4xl mx-auto">
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-center"
							>
								Learn to build powerful web applications using cutting-edge
								technologies
							</motion.p>
							<div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 md:p-8 shadow-lg">
								{user && courseAccess ? (
									<div className="text-center">
										<p className="text-xl font-semibold mb-4">
											Welcome back! Ready to continue your learning journey?
										</p>
										<Link href="/dashboard">
											<button className="btn btn-outline btn-lg text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-primary transition duration-300 w-full sm:w-auto">
												Go to Dashboard
											</button>
										</Link>
									</div>
								) : (
									<div>
										<p className="text-xl font-semibold mb-6 text-center">
											New Batch Starting from October 5th!
										</p>
										<ul className="list-none pl-0 text-base md:text-lg space-y-4 mb-8">
											<li className="flex items-center">
												<BookOpen className="mr-4 flex-shrink-0" /> Live Classes
												every Monday, Wednesday & Friday
											</li>
											<li className="flex items-center">
												<Code className="mr-4 flex-shrink-0" /> Doubt Classes
												every Sunday
											</li>
											<li className="flex items-center">
												<Server className="mr-4 flex-shrink-0" /> Lifetime
												Access to Recordings
											</li>
											<li className="flex items-center">
												<Database className="mr-4 flex-shrink-0" /> Live 24/7
												Doubt Support
											</li>
										</ul>
										<div className="text-center">
											<Link href="/enroll">
												<button className="btn btn-outline btn-lg text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-primary transition duration-300 w-full sm:w-auto">
													Enroll Now
												</button>
											</Link>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

				<section className="container mx-auto py-24 px-4">
					<div className="bg-base-200 rounded-lg shadow-2xl overflow-hidden">
						<div className="flex flex-col lg:flex-row items-center">
							<div className="lg:w-1/2 p-12">
								<h2 className="text-4xl font-bold mb-8 text-primary">
									AI-Powered Learning Experience
								</h2>
								<p className="text-xl mb-12">
									Enhance your learning with our cutting-edge AI technologies,
									providing personalized support and code analysis.
								</p>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<motion.div
										whileHover={{ scale: 1.05 }}
										className="bg-base-100 p-6 rounded-lg shadow-md"
									>
										<h3 className="text-2xl font-semibold mb-4 text-secondary">
											Community Support
										</h3>
										<ul className="space-y-3">
											<li className="flex items-center">
												<Cloud className="w-6 h-6 mr-2 text-accent" />
												<span>24/7 AI-powered doubt resolution</span>
											</li>
											<li className="flex items-center">
												<Cloud className="w-6 h-6 mr-2 text-accent" />
												<span>Instant responses to your questions</span>
											</li>
										</ul>
									</motion.div>

									<motion.div
										whileHover={{ scale: 1.05 }}
										className="bg-base-100 p-6 rounded-lg shadow-md"
									>
										<h3 className="text-2xl font-semibold mb-4 text-secondary">
											Code Analysis
										</h3>
										<ul className="space-y-3">
											<li className="flex items-center">
												<Code className="w-6 h-6 mr-2 text-accent" />
												<span>Get instant feedback on your code</span>
											</li>
											<li className="flex items-center">
												<Code className="w-6 h-6 mr-2 text-accent" />
												<span>Learn best practices and standards</span>
											</li>
										</ul>
									</motion.div>
								</div>

								<div className="mt-12 flex flex-wrap gap-4 justify-center">
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

							<div className="lg:w-1/2 p-12">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
							<div className="card-body items-center text-center">
								<img src="/aws.svg" alt="AWS" className="h-12 w-auto mb-4" />
								<h3 className="card-title">AWS</h3>
								<p>Deploy and scale your applications using AWS services.</p>
							</div>
						</div>
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
						<div className="card  shadow-xl">
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
