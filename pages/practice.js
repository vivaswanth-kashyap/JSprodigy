import React from "react";
import NodeJSCodeEditor from "../components/NodeJSCodeEditor";
import Navbar from "../components/Navbar";

const PracticePage = () => {
	return (
		<div className="flex flex-col h-screen bg-base-100">
			<Navbar />
			<div className="flex-grow overflow-hidden p-4">
				<div className="h-full rounded-lg shadow-lg overflow-hidden">
					<NodeJSCodeEditor />
				</div>
			</div>
		</div>
	);
};

export default PracticePage;
