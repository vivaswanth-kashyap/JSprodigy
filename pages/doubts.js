import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Navbar from "../components/Navbar";
import { MessageCircle, Send, User, Reply } from "lucide-react";

const DoubtItem = ({ doubt, onReply }) => {
	const [isReplying, setIsReplying] = useState(false);
	const [replyContent, setReplyContent] = useState("");

	const handleSubmitReply = (e) => {
		e.preventDefault();
		onReply(doubt.id, replyContent);
		setIsReplying(false);
		setReplyContent("");
	};

	return (
		<li className="bg-base-200 rounded-lg p-4 hover:shadow-md transition-shadow">
			<div className="flex items-start space-x-3">
				<User className="text-base-content opacity-50" />
				<div className="w-full">
					<p className="text-base-content">{doubt.doubt}</p>
					{isReplying ? (
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
					) : (
						<button
							className="mt-2 text-sm btn btn-link"
							onClick={() => setIsReplying(true)}
						>
							Reply
						</button>
					)}
					{doubt.replies && doubt.replies.length > 0 && (
						<div className="mt-4 space-y-2">
							<h3 className="font-semibold">Replies:</h3>
							{doubt.replies.map((reply, index) => (
								<div key={index} className="bg-base-100 p-2 rounded">
									<p className="text-sm">{reply.content}</p>
								</div>
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
			const response = await axios.post(
				`https://api.jsprodigy.com/doubts/${doubtId}/replies`,
				{
					uid,
					content: replyContent,
				}
			);
			console.log(response.data);

			setDoubts((prevDoubts) =>
				prevDoubts.map((doubt) =>
					doubt.id === doubtId
						? { ...doubt, replies: [...(doubt.replies || []), response.data] }
						: doubt
				)
			);
		} catch (error) {
			console.error(error);
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

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="card bg-base-100 shadow-xl h-fit">
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
							<div className="h-[500px] overflow-y-auto pr-2">
								<ul className="space-y-4">
									{doubts.map((doubt) => (
										<DoubtItem
											key={doubt.id}
											doubt={doubt}
											onReply={handleReply}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
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
