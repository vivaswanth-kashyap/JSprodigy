// pages/enroll.js
import Head from "next/head";
import Link from "next/link";

export default function Enroll() {
	return (
		<div className="bg-gray-100 min-h-screen">
			<Head>
				<title>Enroll - Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="bg-white shadow">
				<div className="container mx-auto py-6 px-4">
					<nav>
						<Link href="/">
							<button className="text-xl font-semibold">
								JS Full Stack Course
							</button>
						</Link>
					</nav>
				</div>
			</header>

			<main className="container mx-auto py-12 px-4">
				<h1 className="text-3xl font-semibold mb-8">Enroll Now</h1>
				<form
					action="https://formspree.io/f/xjvnnaqn"
					method="POST"
					className="max-w-md mx-auto"
				>
					<div className="mb-4">
						<label htmlFor="name" className="block mb-2 font-semibold">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="block mb-2 font-semibold">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="phone" className="block mb-2 font-semibold">
							Phone Number
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="dob" className="block mb-2 font-semibold">
							Date of Birth
						</label>
						<input
							type="date"
							id="dob"
							name="dob"
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
					>
						Submit
					</button>
				</form>
			</main>

			<footer className="bg-gray-800 text-white py-8 bottom-0">
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
