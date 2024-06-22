import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Payments() {
	const [selectedQR, setSelectedQR] = useState("PhonePe");
	const router = useRouter();
	const { course } = router.query;

	const getCoursePrice = () => {
		if (course === "core") {
			return "₹2,999";
		} else if (course === "pro") {
			return "₹4,999";
		}
		return "";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
			<Navbar />
			<main className="container mx-auto py-16 px-4">
				<div className="max-w-3xl mx-auto">
					{/* ... */}
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
						{/* ... */}
						<div className="mb-8">
							<h3 className="text-xl font-semibold mb-4">
								Select Payment Method
							</h3>
							<div className="flex justify-center mb-4">
								<div className="btn-group">
									<button
										className={`btn ${
											selectedQR === "PhonePe" ? "btn-active" : ""
										}`}
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
