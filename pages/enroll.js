import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { BookOpen, Users, Globe, Award, Check, Star } from "lucide-react";

const PriceDisplay = ({ inrPrice, usdPrice, isIndia }) => (
	<div className="flex flex-col items-center justify-center mb-6">
		<span className="text-5xl font-bold text-primary mb-2">
			{isIndia ? `₹${inrPrice}` : `$${usdPrice}`}
		</span>
		<span className="badge badge-secondary badge-lg">Early Bird Price</span>
	</div>
);

const CourseCard = ({
	title,
	features,
	inrPrice,
	usdPrice,
	isIndia,
	link,
	isPro,
}) => (
	<div
		className={`bg-base-100 shadow-xl rounded-lg p-8 transition-all duration-300 hover:shadow-2xl flex flex-col h-full relative ${
			isPro ? "border-4 border-primary" : ""
		}`}
	>
		{isPro && (
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 rounded-full flex items-center shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
				<Star className="w-5 h-5 mr-2 text-yellow-300 fill-current" />
				<span className="font-bold text-white">Recommended</span>
			</div>
		)}
		<h2 className="text-3xl font-bold mb-6 text-center text-primary">
			{title}
		</h2>
		<ul className="list-none text-lg text-base-content space-y-4 mb-8 flex-grow">
			{features.map((feature, index) => (
				<li key={index} className="flex items-center">
					<Check className="text-success mr-3 flex-shrink-0" size={24} />
					<span>{feature}</span>
				</li>
			))}
		</ul>
		<div className="mt-auto">
			<PriceDisplay inrPrice={inrPrice} usdPrice={usdPrice} isIndia={isIndia} />
			<div className="text-center">
				<Link href={link}>
					<button
						className={`btn ${
							isPro ? "btn-primary" : "btn-outline btn-primary"
						} btn-lg w-full`}
					>
						Enroll Now
					</button>
				</Link>
			</div>
		</div>
	</div>
);

const FeatureItem = ({ Icon, text }) => (
	<div className="flex items-start bg-base-100 p-6 rounded-lg shadow-md border border-base-300">
		<Icon className="text-primary mr-4 flex-shrink-0" size={32} />
		<p className="text-xl">{text}</p>
	</div>
);

export default function Enroll() {
	const [isIndia, setIsIndia] = useState(true);

	useEffect(() => {
		const checkLocation = async () => {
			try {
				const response = await fetch("https://ipapi.co/json/");
				const data = await response.json();
				setIsIndia(data.country_code === "IN");
			} catch (error) {
				console.error("Error fetching location:", error);
				setIsIndia(true); // Default to India if there's an error
			}
		};

		checkLocation();
	}, []);

	return (
		<div className="min-h-screen bg-base-100">
			<Head>
				<title>Enroll Now | Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="container mx-auto py-24 px-4">
				<div className="max-w-6xl mx-auto space-y-24">
					<section>
						<h1 className="text-5xl font-bold mb-6 text-center text-primary">
							Enroll Now
						</h1>
						<p className="text-xl text-center mb-12 text-base-content max-w-3xl mx-auto">
							Choose the perfect plan to kickstart your web development journey
							and transform your career
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
							<CourseCard
								title="Core Course"
								features={[
									"Back-end Fundamentals",
									"Databases",
									"Web Development Fundamentals",
									"Front-end Basics",
									"Advanced Front-end",
									"React and Modern Front-end",
								]}
								inrPrice={2999}
								usdPrice={39}
								isIndia={isIndia}
								link="/payments?course=core"
								isPro={false}
							/>
							<CourseCard
								title="Pro Course"
								features={[
									"Everything in Core Course",
									"Advanced Back-end",
									"Advanced Frameworks and Technologies",
									"Containerization and Orchestration",
									"Deployment and Hosting",
								]}
								inrPrice={4999}
								usdPrice={59}
								isIndia={isIndia}
								link="/payments?course=pro"
								isPro={true}
							/>
						</div>
					</section>

					<section className="text-center">
						<Link href="/curriculum">
							<button className="btn btn-secondary btn-lg">
								View Full Curriculum
							</button>
						</Link>
					</section>

					<section className="bg-base-100 shadow-xl rounded-lg p-12 border border-base-300">
						<h2 className="text-4xl font-bold mb-12 text-center text-primary">
							Why Choose Our Course?
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<FeatureItem
								Icon={BookOpen}
								text="Comprehensive curriculum covering all aspects of Full Stack Web Development"
							/>
							<FeatureItem
								Icon={Users}
								text="Expert instructors with industry experience"
							/>
							<FeatureItem
								Icon={Globe}
								text="Lifetime access to course materials and resources"
							/>
							<FeatureItem
								Icon={Award}
								text="Hands-on projects and practical coding exercises"
							/>
						</div>
					</section>
				</div>
			</main>
			<footer className="bg-neutral py-12 text-center mt-24">
				<p className="text-neutral-content">
					© {new Date().getFullYear()} Full Stack Web Development with
					JavaScript. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
