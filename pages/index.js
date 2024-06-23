import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const uid = currentUser ? currentUser.uid : null;
	const [courseAccess, setCourseAccess] = useState(false);

	console.log(uid);

	useEffect(() => {
		const fetchUserData = async () => {
			if (uid) {
				try {
					const response = await axios.get(
						`https://api.jsprodigy.com/users/${uid}`
					);
					console.log(response);
					setCourseAccess(response.data.courseAccess);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, [uid]);

	return (
		<div className="bg-base-100 min-h-screen">
			<Head>
				<title>Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/logo.svg" />
			</Head>

			<Navbar />

			<main>
				<section className="bg-gradient-to-r from-primary to-secondary rounded-lg text-white py-20 shadow-3xl mx-auto">
					<div className="container mx-auto px-4">
						<h1 className="text-4xl font-bold mb-4">
							Master Full Stack Web Development with JavaScript
						</h1>
						<p className="text-xl mb-8">
							Learn to build powerful web applications using Node.js, Express,
							React, Next.js, MongoDB, Redis, and GraphQL.
						</p>
						{courseAccess ? (
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
									<ul className="list-disc pl-8 text-lg">
										<li className="mb-2">Live online classes</li>
										<li>Recordings accessible for 2 years</li>
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

				{/* Rest of the content remains the same */}
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

				{courseAccess && (
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

				{/* ... (rest of the sections) ... */}
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
