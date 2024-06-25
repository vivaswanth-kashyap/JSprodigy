import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
	FaHome,
	FaBook,
	FaCode,
	FaChartLine,
	FaQuestionCircle,
	FaCog,
	FaBars,
} from "react-icons/fa";
import VerticalNavbar from "../components/verticalNavbar";

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState("home");
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const navItems = [
		{ id: "home", icon: FaHome, label: "Home" },
		{ id: "library", icon: FaBook, label: "Library" },
		{ id: "practice", icon: FaCode, label: "Practice" },
		{ id: "progress", icon: FaChartLine, label: "Progress" },
		{ id: "support", icon: FaQuestionCircle, label: "Support" },
		{ id: "settings", icon: FaCog, label: "Settings" },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "home":
				return <HomeContent />;
			case "library":
				return <LibraryContent />;
			case "practice":
				return <PracticeContent />;
			case "progress":
				return <ProgressContent />;
			case "support":
				return <SupportContent />;
			case "settings":
				return <SettingsContent />;
			default:
				return <HomeContent />;
		}
	};

	return (
		<div className="bg-base-100 min-h-screen flex flex-col md:flex-row">
			<Head>
				<title>Dashboard | Full Stack Web Development</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Mobile navbar toggle */}
			<div className="md:hidden p-4">
				<button
					onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
					className="btn btn-square btn-ghost"
				>
					<FaBars size={24} />
				</button>
			</div>

			{/* Vertical Navbar */}
			<div className={`md:block ${isMobileNavOpen ? "block" : "hidden"}`}>
				<VerticalNavbar
					activeTab={activeTab}
					setActiveTab={(tab) => {
						setActiveTab(tab);
						setIsMobileNavOpen(false);
					}}
				/>
			</div>

			{/* Main Content */}
			<main className="flex-grow p-4 md:p-8 overflow-y-auto">
				{renderContent()}
			</main>
		</div>
	);
}

function HomeContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Welcome back!
			</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
				<div className="card bg-primary text-primary-content">
					<div className="card-body">
						<h2 className="card-title text-lg md:text-xl">Express.js Guide</h2>
						<p className="text-sm md:text-base">
							Learn how to set up an Express.js project with MongoDB
						</p>
						<div className="card-actions justify-end">
							<Link href="/tutorials/express" className="btn btn-sm md:btn-md">
								View Guide
							</Link>
						</div>
					</div>
				</div>
				<div className="card bg-secondary text-secondary-content">
					<div className="card-body">
						<h2 className="card-title">Postman Guide</h2>
						<p>Download and setup Postman</p>
						<div className="card-actions justify-end">
							<Link href="/tutorials/postman" className="btn btn-sm md:btn-md">
								View Guide
							</Link>
						</div>
					</div>
				</div>
				<div className="card bg-accent text-accent-content">
					<div className="card-body">
						<h2 className="card-title">Continue Learning</h2>
						<p>Pick up where you left off in "Advanced React Patterns"</p>
						<div className="card-actions justify-end">
							<button className="btn">Resume</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function LibraryContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Course Library
			</h2>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
				{[
					"JavaScript Fundamentals",
					"React Essentials",
					"Node.js and Express",
					"MongoDB Mastery",
					"GraphQL API Development",
					"AWS for Web Developers",
				].map((course) => (
					<div key={course} className="card bg-base-200 shadow-xl">
						<div className="card-body">
							<h2 className="card-title text-lg md:text-xl">{course}</h2>
							<p className="text-sm md:text-base">
								Learn the ins and outs of {course} in this comprehensive module.
							</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary btn-sm md:btn-md">
									Start Course
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function PracticeContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Practice Arena
			</h2>
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-lg md:text-xl">Code Editor</h2>
					<p className="text-sm md:text-base">
						Practice your skills in our interactive code editor.
					</p>
					<div className="mockup-code mt-4">
						<pre data-prefix="$">
							<code>npm run dev</code>
						</pre>
					</div>
					<div className="card-actions justify-end mt-4">
						<button className="btn btn-primary btn-sm md:btn-md">
							Open Editor
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProgressContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Your Progress
			</h2>
			<div className="stats stats-vertical sm:stats-horizontal shadow">
				<div className="stat">
					<div className="stat-figure text-primary">
						<FaBook className="w-6 h-6 md:w-8 md:h-8" />
					</div>
					<div className="stat-title text-xs md:text-sm">Courses Completed</div>
					<div className="stat-value text-primary text-2xl md:text-4xl">3</div>
					<div className="stat-desc text-xs md:text-sm">
						Out of 6 total courses
					</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary">
						<FaCode className="w-6 h-6 md:w-8 md:h-8" />
					</div>
					<div className="stat-title text-xs md:text-sm">Coding Challenges</div>
					<div className="stat-value text-secondary text-2xl md:text-4xl">
						42
					</div>
					<div className="stat-desc text-xs md:text-sm">
						Completed this month
					</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-accent">
						<FaChartLine className="w-6 h-6 md:w-8 md:h-8" />
					</div>
					<div className="stat-title text-xs md:text-sm">Overall Progress</div>
					<div className="stat-value text-accent text-2xl md:text-4xl">70%</div>
					<div className="stat-desc text-xs md:text-sm">
						Towards course completion
					</div>
				</div>
			</div>
		</div>
	);
}

function SupportContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Support</h2>
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-lg md:text-xl">Need Help?</h2>
					<p className="text-sm md:text-base">
						Our support team is here to assist you. Feel free to reach out with
						any questions or concerns.
					</p>
					<div className="card-actions justify-end mt-4">
						<button className="btn btn-primary btn-sm md:btn-md">
							Contact Support
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function SettingsContent() {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Account Settings
			</h2>
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-lg md:text-xl">
						Personal Information
					</h2>
					<form className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="your-email@example.com"
							className="input input-bordered w-full max-w-xs"
						/>
						<label className="label mt-4">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="********"
							className="input input-bordered w-full max-w-xs"
						/>
						<div className="card-actions justify-end mt-6">
							<button className="btn btn-primary btn-sm md:btn-md">
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
