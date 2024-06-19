// pages/curriculum.js
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Curriculum() {
	return (
		<div className="bg-base-100 min-h-screen">
			<Head>
				<title>Curriculum - Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="container mx-auto py-12 px-4">
				<h1 className="text-5xl font-bold mb-8 text-center">
					Course Curriculum
				</h1>
				<div className="grid grid-cols-1 gap-6">
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Back-end Fundamentals
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Introduction to Node.js</li>
								<li>Modules and Applications</li>
								<li>Asynchronous Programming</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Databases
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>MongoDB</li>
								<li>API Development and Intermediate MongoDB</li>
								<li>Firebase Realtime Database</li>
								<li>Firebase Firestore</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Web Development Fundamentals
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Web Development Fundamentals</li>
								<li>Middleware</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Front-end Basics
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Collaborative Programming and Basic HTML</li>
								<li>Introduction to CSS and HTML Forms</li>
								<li>Front-end JavaScript and Client-side Form Validation</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Advanced Front-end
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>AJAX and Security</li>
								<li>jQuery, Web Browsers, and Web Accessibility</li>
								<li>CSS3, Accessibility, and Bootstrap</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Advanced Back-end
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Introduction to Redis</li>
								<li>GraphQL Server</li>
								<li>Security Concerns and Defenses</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							React and Modern Front-end
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>
									React Fundamentals (Props, State, useState, useEffect, Custom
									Hooks, useCallback, useContext, useMemo)
								</li>
								<li>Building a Custom Tech Stack and WebSockets</li>
								<li>GraphQL Client and Multiprocess Web Development (IPC)</li>
								<li>Tailwind CSS and SASS</li>
								<li>State Management with Context API and Redux</li>
								<li>Firebase Authentication</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Advanced Frameworks and Technologies
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Next.js - Page-based Routing</li>
								<li>Next.js - App Router</li>
								<li>Vue.js and TypeScript</li>
								<li>Introduction to React Native</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Containerization and Orchestration
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Docker</li>
								<li>Kubernetes</li>
							</ul>
						</div>
					</div>
					<div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-medium bg-primary text-primary-content rounded-t-box">
							Deployment and Hosting
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Netlify</li>
								<li>AWS</li>
							</ul>
						</div>
					</div>
				</div>
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
