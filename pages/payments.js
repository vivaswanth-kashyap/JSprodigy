import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Payments() {
	const [selectedQR, setSelectedQR] = useState("PhonePe");
	const [isIndia, setIsIndia] = useState(true);
	const router = useRouter();
	const { course } = router.query;

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

	const getCoursePrice = () => {
		if (course === "core") {
			return isIndia ? "₹2,999" : "$39";
		} else if (course === "pro") {
			return isIndia ? "₹4,999" : "$59";
		}
		return "";
	};

	const IndiaPayment = () => (
		<div>
			<div className="mb-8">
				<h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
				<div className="flex justify-center mb-4">
					<div className="btn-group">
						<button
							className={`btn ${selectedQR === "PhonePe" ? "btn-active" : ""}`}
							onClick={() => setSelectedQR("PhonePe")}
						>
							PhonePe
						</button>
						<button
							className={`btn ${
								selectedQR === "GooglePay" ? "btn-active" : ""
							}`}
							onClick={() => setSelectedQR("GooglePay")}
						>
							Google Pay
						</button>
					</div>
				</div>
				<div className="flex justify-center">
					<div className="relative w-64 h-64">
						<Image
							src={`/${selectedQR}_QR.${
								selectedQR === "PhonePe" ? "jpg" : "png"
							}`}
							alt={`${selectedQR} QR Code`}
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
				<p className="mt-4 text-center">
					Scan the {selectedQR} QR code to make the payment
				</p>
			</div>
		</div>
	);

	const USPayment = () => (
		<div className="mb-8">
			<h3 className="text-xl font-semibold mb-4">Pay with Zelle</h3>
			<div className="flex justify-center mb-4">
				<div className="relative w-64 h-64">
					<Image
						src="/Zelle_QR.jpg"
						alt="Zelle QR Code"
						layout="fill"
						objectFit="contain"
					/>
				</div>
			</div>
			<p className="mt-4 text-center">
				Scan the Zelle QR code to make the payment
			</p>
			<p className="text-center mt-2">
				Or send payment to:{" "}
				<span className="font-bold">vivaswanth3@gmail.com</span>
			</p>
		</div>
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
			<Navbar />
			<main className="container mx-auto py-16 px-4">
				<div className="max-w-3xl mx-auto">
					<h1 className="text-4xl font-bold mb-8 text-center">
						Complete Your Payment
					</h1>
					<div className="bg-base-100 shadow-xl rounded-lg p-8">
						<h2 className="text-2xl font-semibold mb-4">Course Details</h2>
						<p className="text-xl mb-2">
							<span className="font-bold">Course:</span> Full Stack Web
							Development with JavaScript ({course === "core" ? "Core" : "Pro"})
						</p>
						<p className="text-xl mb-6">
							<span className="font-bold">Price:</span> {getCoursePrice()}
						</p>

						{isIndia ? <IndiaPayment /> : <USPayment />}

						<div className="text-center">
							<Link
								href={`https://forms.gle/rUGLrdXza5FnKxzM8`}
								target="_blank"
							>
								<button className="btn btn-primary btn-lg">
									I have made the payment
								</button>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
