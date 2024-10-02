import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { ChevronRight, BookOpen } from "lucide-react";

const CurriculumSection = ({ title, topics }) => (
	<div className="card bg-base-100 shadow-xl mb-6">
		<div className="card-body p-0">
			<div className="bg-primary text-primary-content p-4 flex items-center rounded-t-xl">
				<BookOpen className="mr-2" />
				<h2 className="card-title">{title}</h2>
			</div>
			<ul className="divide-y divide-base-300">
				{topics.map((topic, index) => (
					<li key={index} className="p-4 hover:bg-base-200 flex items-center">
						<ChevronRight className="text-primary mr-2" />
						<span>{topic}</span>
					</li>
				))}
			</ul>
		</div>
	</div>
);

export default function Curriculum() {
	const curriculumData = [
		{
			title: "Back-end Fundamentals",
			topics: [
				"Introduction to Node.js",
				"Modules and Applications",
				"Asynchronous Programming",
			],
		},
		{
			title: "Databases",
			topics: [
				"MongoDB",
				"API Development and Intermediate MongoDB",
				"Firebase Realtime Database",
				"Firebase Firestore",
			],
		},
		{
			title: "Web Development Fundamentals",
			topics: ["Web Development Fundamentals", "Middleware"],
		},
		{
			title: "Front-end Basics",
			topics: [
				"Collaborative Programming and Basic HTML",
				"Introduction to CSS and HTML Forms",
				"Front-end JavaScript and Client-side Form Validation",
			],
		},
		{
			title: "Advanced Front-end",
			topics: [
				"AJAX and Security",
				"jQuery, Web Browsers, and Web Accessibility",
				"CSS3, Accessibility, and Bootstrap",
			],
		},
		{
			title: "Advanced Back-end",
			topics: [
				"Introduction to Redis",
				"GraphQL Server",
				"Security Concerns and Defenses",
			],
		},
		{
			title: "React and Modern Front-end",
			topics: [
				"React Fundamentals (Props, State, useState, useEffect, Custom Hooks, useCallback, useContext, useMemo)",
				"Building a Custom Tech Stack and WebSockets",
				"GraphQL Client and Multiprocess Web Development (IPC)",
				"Tailwind CSS and SASS",
				"State Management with Context API and Redux",
				"Firebase Authentication",
			],
		},
		{
			title: "Advanced Frameworks and Technologies",
			topics: [
				"Next.js - Page-based Routing",
				"Next.js - App Router",
				"Vue.js and TypeScript",
				"Introduction to React Native",
			],
		},
		{
			title: "Containerization and Orchestration",
			topics: ["Docker", "Kubernetes"],
		},
		{
			title: "Deployment and Hosting",
			topics: ["Netlify", "AWS"],
		},
	];

	return (
		<div className="min-h-screen bg-base-100">
			<Head>
				<title>Curriculum - Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="container mx-auto py-12 px-4">
				<h1 className="text-4xl font-bold mb-8 text-center text-primary">
					Course Curriculum
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{curriculumData.map((section, index) => (
						<CurriculumSection key={index} {...section} />
					))}
				</div>
			</main>
			<footer className="bg-neutral text-neutral-content py-8 mt-12">
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
