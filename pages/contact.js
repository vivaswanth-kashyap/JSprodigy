import Navbar from "../components/Navbar";

export default function Contact() {
	return (
		<div className="bg-base-200">
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-4xl font-bold mb-8">Contact Us</h1>

				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
						<p className="mb-4">
							We're here to help! Please feel free to reach out to us using the
							following email addresses:
						</p>

						<div className="mb-4">
							<h3 className="text-xl font-semibold">Email</h3>
							<p>
								General Inquiries:{" "}
								<a
									href="mailto:info@jsprodigy.com"
									className="link link-primary"
								>
									info@jsprodigy.com
								</a>
							</p>
							<p>
								Technical Support:{" "}
								<a
									href="mailto:support@jsprodigy.com"
									className="link link-primary"
								>
									support@jsprodigy.com
								</a>
							</p>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">Response Time</h2>
						<p>
							We strive to respond to all inquiries within 24 business hours.
							For urgent matters, please use our support email.
						</p>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
						<p>Monday - Friday: 9:00 AM - 5:00 PM (EST)</p>
					</div>

					<div>
						<h2 className="text-2xl font-semibold mb-4">FAQs</h2>
						<div className="space-y-4">
							<div className="collapse collapse-plus bg-base-200">
								<input type="radio" name="my-accordion-3" checked="checked" />
								<div className="collapse-title text-xl font-medium">
									How do I reset my password?
								</div>
								<div className="collapse-content">
									<p>
										You can reset your password by clicking on the "Forgot
										Password" link on the login page. Follow the instructions
										sent to your email to create a new password.
									</p>
								</div>
							</div>
							<div className="collapse collapse-plus bg-base-200">
								<input type="radio" name="my-accordion-3" />
								<div className="collapse-title text-xl font-medium">
									What are your support hours?
								</div>
								<div className="collapse-content">
									<p>
										Our support team is available Monday through Friday, from
										9:00 AM to 5:00 PM Eastern Standard Time (EST).
									</p>
								</div>
							</div>
							<div className="collapse collapse-plus bg-base-200">
								<input type="radio" name="my-accordion-3" />
								<div className="collapse-title text-xl font-medium">
									How quickly can I expect a response?
								</div>
								<div className="collapse-content">
									<p>
										We strive to respond to all inquiries within 24 business
										hours. For urgent matters, please use our support email for
										faster assistance.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
