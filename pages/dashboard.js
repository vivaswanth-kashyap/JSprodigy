import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
	FaHome,
	FaBook,
	FaCode,
	FaChartLine,
	FaQuestionCircle,
	FaCog,
	FaBars,
} from "react-icons/fa";
import axios from "axios";
import VerticalNavbar from "../components/verticalNavbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Dashboard() {
	const [activeTab, setActiveTab] = useState("home");
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				fetchUserData(user.uid);
			} else {
				router.push("/login");
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const fetchUserData = async (uid) => {
		try {
			const response = await axios.get(
				`https://api.jsprodigy.com/users/${uid}`
			);
			setUserData(response.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

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
				return <HomeContent userData={userData} />;
			case "library":
				return <LibraryContent courseAccess={userData?.courseAccess} />;
			case "practice":
				return <PracticeContent />;
			case "progress":
				return <ProgressContent />;
			case "support":
				return <SupportContent />;
			case "settings":
				return <SettingsContent />;
			default:
				return <HomeContent userData={userData} />;
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return null; // This will prevent any flash of content before redirect
	}

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

function HomeContent({ userData }) {
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
						<p>
							Pick up where you left off in your Full Stack Web Development
							course
						</p>
						<div className="card-actions justify-end">
							<Link href="/course" className="btn btn-sm md:btn-md">
								Resume
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function LibraryContent({ courseAccess }) {
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Course Library
			</h2>
			<div className="card bg-base-200 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-lg md:text-xl">
						Full Stack Web Development with JavaScript
					</h2>
					<p className="text-sm md:text-base">
						Master the art of full stack web development using modern JavaScript
						technologies.
					</p>
					<div className="card-actions justify-end">
						{courseAccess ? (
							<Link href="/course" className="btn btn-primary btn-sm md:btn-md">
								Continue Course
							</Link>
						) : (
							<Link href="/enroll" className="btn btn-primary btn-sm md:btn-md">
								Enroll Now
							</Link>
						)}
					</div>
				</div>
			</div>
			{courseAccess === "pro" && (
				<div className="mt-4 text-sm md:text-base">
					You have access to all Pro tier content. Enjoy your learning journey!
				</div>
			)}
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
					<h2 className="card-title text-lg md:text-xl">
						Code Editor with AI Analysis
					</h2>
					<p className="text-sm md:text-base">
						Practice your skills in our interactive code editor with integrated
						AI code analysis.
					</p>
					<div className="mockup-code mt-4">
						<pre data-prefix="$">
							<code>npm run dev</code>
						</pre>
					</div>
					<div className="card-actions justify-end mt-4">
						<Link href={`/practice`}>
							<button className="btn btn-primary btn-sm md:btn-md">
								Open Editor
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

function ProgressContent() {
	// This component remains largely unchanged
	return (
		<div>
			<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
				Your Progress
			</h2>
			<div className="stats stats-vertical sm:stats-horizontal shadow">
				{/* ... existing progress stats ... */}
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
						<Link href={`/contact`}>
							<button className="btn btn-primary btn-sm md:btn-md">
								Contact Support
							</button>
						</Link>
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
					<p className="text-sm md:text-base">
						To update your profile information, please contact our support team.
					</p>
					<div className="card-actions justify-end mt-4">
						<Link href={`/contact`}>
							<button className="btn btn-primary btn-sm md:btn-md">
								Contact Support
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

// Remove the getServerSideProps function
