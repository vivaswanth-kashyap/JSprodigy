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
				<h1 className="text-4xl font-bold mb-8 text-center">
					Course Curriculum
				</h1>

				<div className="grid grid-row-1 gap-3">
					<div className="collapse rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-semibold bg-primary text-primary-content rounded-t-box">
							JavaScript Fundamentals
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Introduction to JavaScript</li>
								<li>Data Types and Variables</li>
								<li>Control Flow and Loops</li>
								<li>Functions and Scope</li>
								<li>Arrays and Objects</li>
								<li>Modules and ES6+ Features</li>
							</ul>
						</div>
					</div>

					<div className="collapse rounded-box">
						<input type="checkbox" />
						<div className="collapse-title text-xl font-semibold bg-primary text-primary-content rounded-t-box">
							React Fundamentals
						</div>
						<div className="collapse-content bg-base-200 rounded-b-box">
							<ul className="list-disc pl-8 text-lg">
								<li>Introduction to React</li>
								<li>Components and JSX</li>
								<li>State and Props</li>
								<li>Lifecycle Methods</li>
								<li>Hooks</li>
								<li>React Router</li>
							</ul>
						</div>
					</div>

					{/* Add more collapsible sections for other topics */}
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
