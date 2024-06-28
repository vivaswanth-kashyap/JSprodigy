import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar";
import { MessageCircle, Send, User, Reply, Bot } from "lucide-react";

const DoubtItem = ({ doubt, onReply, onAIReply }) => {
	const [isReplying, setIsReplying] = useState(false);
	const [replyContent, setReplyContent] = useState("");
	const [isAIReplying, setIsAIReplying] = useState(false);

	const handleSubmitReply = async (e) => {
		e.preventDefault();
		await onReply(doubt._id, replyContent);
		setIsReplying(false);
		setReplyContent("");
	};

	const handleAIReply = async () => {
		setIsAIReplying(true);
		await onAIReply(doubt._id, doubt.doubt);
		setIsAIReplying(false);
	};

	const renderReply = (reply) => {
		if (reply.isAI) {
			const aiReply = JSON.parse(reply.reply);
			return (
				<div className="bg-secondary p-2 rounded">
					<div className="flex items-center space-x-2 mb-2">
						<Bot className="text-primary" />
						<span className="font-semibold">AI Response</span>
					</div>
					<h4 className="font-semibold">{aiReply.title}</h4>
					{aiReply.steps &&
						aiReply.steps.map((step, index) => (
							<div key={index} className="mt-2">
								<p>{step.description}</p>
								{step.code && (
									<pre className="bg-base-100 p-2 rounded mt-1 overflow-x-auto">
										<code className={`language-${step.language}`}>
											{step.code}
										</code>
									</pre>
								)}
							</div>
						))}
					<p className="mt-2">{aiReply.conclusion}</p>
				</div>
			);
		} else {
			return (
				<div className="bg-base-100 p-2 rounded">
					<pre className="text-sm whitespace-pre-wrap">{reply.reply}</pre>
				</div>
			);
		}
	};

	return (
		<li className="bg-base-200 rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
			<div className="flex items-start space-x-3">
				<User className="text-base-content opacity-50" />
				<div className="w-full">
					<pre className="text-base-content whitespace-pre-wrap">
						{doubt.doubt}
					</pre>
					<div className="mt-2 space-x-2">
						<button
							className="btn btn-sm btn-outline"
							onClick={() => setIsReplying(true)}
						>
							<Reply className="mr-1 h-4 w-4" /> Reply
						</button>
						<button
							className="btn btn-sm btn-outline"
							onClick={handleAIReply}
							disabled={isAIReplying}
						>
							<Bot className="mr-1 h-4 w-4" />
							{isAIReplying ? "AI Thinking..." : "AI Reply"}
						</button>
					</div>
					{isReplying && (
						<form onSubmit={handleSubmitReply} className="mt-2 space-y-2">
							<textarea
								className="textarea textarea-bordered w-full"
								value={replyContent}
								onChange={(e) => setReplyContent(e.target.value)}
								placeholder="Your reply..."
								rows="2"
							></textarea>
							<div className="flex justify-end space-x-2">
								<button
									type="button"
									className="btn btn-ghost btn-sm"
									onClick={() => setIsReplying(false)}
								>
									Cancel
								</button>
								<button type="submit" className="btn btn-primary btn-sm">
									<Reply className="mr-1 h-4 w-4" /> Submit Reply
								</button>
							</div>
						</form>
					)}
					{doubt.replies && doubt.replies.length > 0 && (
						<div className="mt-4 space-y-2">
							<h3 className="font-semibold">Replies:</h3>
							{doubt.replies.map((reply, index) => (
								<div key={index}>{renderReply(reply)}</div>
							))}
						</div>
					)}
				</div>
			</div>
		</li>
	);
};

export default function Community({ doubts: initialDoubts }) {
	const [newDoubt, setNewDoubt] = useState("");
	const [doubts, setDoubts] = useState(initialDoubts);
	const auth = getAuth();
	const currentUser = auth.currentUser;
	const uid = currentUser ? currentUser.uid : null;

	const router = useRouter();

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [courseAccess, setCourseAccess] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user) {
				try {
					const response = await axios.get(
						`https://api.jsprodigy.com/users/${user.uid}`
					);
					setCourseAccess(response.data.courseAccess);
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		fetchUserData();
	}, [user]);

	if (loading) {
		return (
			<div className="bg-base-100 min-h-screen">
				<Navbar />
				<div className="container flex justify-center my-72 mx-auto">
					<span className="loading loading-dots loading-lg"></span>
					<span className="loading loading-dots loading-lg"></span>
				</div>
			</div>
		);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("https://api.jsprodigy.com/doubts", {
				uid,
				doubt: newDoubt,
			});
			console.log(response.data);
			setDoubts([response.data, ...doubts]);
			setNewDoubt("");
		} catch (error) {
			console.error(error);
		}
	};

	const handleReply = async (doubtId, replyContent) => {
		try {
			console.log("doubtId", doubtId);
			console.log("reply", replyContent);
			const response = await axios.post(
				"https://api.jsprodigy.com/doubts/reply",
				{
					uid,
					id: doubtId,
					reply: replyContent,
				}
			);
			console.log("response", response);
			console.log("response data", response.data);
			const updatedDoubt = response.data;
			setDoubts((prevDoubts) =>
				prevDoubts.map((doubt) =>
					doubt._id === doubtId ? updatedDoubt : doubt
				)
			);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAIReply = async (doubtId, doubtContent) => {
		try {
			console.log("Sending AI reply request:", { doubtId, doubtContent });
			const response = await axios.post(
				`https://api.jsprodigy.com/doubts/ai-response`,
				{
					doubt: doubtContent,
					id: doubtId,
				}
			);
			console.log("AI reply response:", response.data);
			const updatedDoubt = response.data;
			setDoubts((prevDoubts) =>
				prevDoubts.map((doubt) =>
					doubt._id === doubtId ? updatedDoubt : doubt
				)
			);
		} catch (error) {
			console.error("AI reply error:", error);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<div className="container mx-auto py-12 px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-primary mb-4">
						Community Hub
					</h1>
					<p className="text-xl text-base-content opacity-70">
						Connect, Learn, and Grow Together
					</p>
				</div>
				{user && courseAccess ? (
					<div className="space-y-8">
						<div className="card bg-base-100 shadow-xl sticky">
							<div className="card-body">
								<h2 className="card-title text-2xl text-primary flex items-center">
									<MessageCircle className="mr-2" />
									Ask a Question
								</h2>
								<form onSubmit={handleSubmit} className="space-y-4">
									<textarea
										className="textarea textarea-bordered w-full"
										value={newDoubt}
										onChange={(e) => setNewDoubt(e.target.value)}
										placeholder="What's on your mind?"
										rows="4"
									></textarea>
									<button className="btn btn-primary w-full" type="submit">
										<Send className="mr-2" /> Ask Community
									</button>
								</form>
							</div>
						</div>

						<div className="card bg-base-100 shadow-xl">
							<div className="card-body">
								<h2 className="card-title text-2xl text-primary mb-4">
									Recent Questions
								</h2>
								<div className="max-h-[600px] overflow-y-auto pr-2">
									<ul className="space-y-4">
										{doubts.map((doubt) => (
											<DoubtItem
												key={doubt._id}
												doubt={doubt}
												onReply={handleReply}
												onAIReply={handleAIReply}
											/>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="container mx-auto py-12 px-4">
						<div className="text-center">
							<h1 className="text-4xl font-bold text-primary mb-4">
								Access Restricted
							</h1>
							<p className="text-xl text-base-content opacity-70">
								Enroll to access the community and try out the AI features
							</p>
							<button
								className="btn btn-primary mt-8"
								onClick={() => router.push("/enroll")}
							>
								Enroll Now
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const response = await axios.get("https://api.jsprodigy.com/doubts");
		const doubts = response.data;
		return { props: { doubts } };
	} catch (error) {
		console.error(error);
		return { props: { doubts: [] } };
	}
}
