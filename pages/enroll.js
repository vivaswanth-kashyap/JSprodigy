// pages/enroll.js
import Head from "next/head";
import Link from "next/link";

export default function Enroll() {
	return (
		<div className="bg-base-100 min-h-screen flex flex-col">
			<Head>
				<title>Enroll - Full Stack Web Development with JavaScript</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="bg-base-100 shadow">
				<div className="container mx-auto py-6 px-4">
					<nav>
						<Link href="/">
							<button className="btn btn-ghost text-xl font-semibold">
								JS Full Stack Course
							</button>
						</Link>
					</nav>
				</div>
			</header>

			<main className="container mx-auto py-12 px-4 flex-grow">
				<h1 className="text-4xl font-semibold mb-8">Enroll Now</h1>
				<form
					action="https://formspree.io/f/xjvnnaqn"
					method="POST"
					className="max-w-md mx-auto"
				>
					<div className="mb-4">
						<label htmlFor="name" className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="label">
							<span className="label-text">Email Address</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="phone" className="label">
							<span className="label-text">Phone Number</span>
						</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="dob" className="label">
							<span className="label-text">Date of Birth</span>
						</label>
						<input
							type="date"
							id="dob"
							name="dob"
							className="input input-bordered w-full"
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary w-full">
						Submit
					</button>
				</form>
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
