import { useState, useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const NodeSetup = () => {
	const [activeTab, setActiveTab] = useState("windows");
	const [copiedText, setCopiedText] = useState("");

	const copyToClipboard = useCallback((text) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedText("Copied!");
			setTimeout(() => setCopiedText(""), 2000);
		});
	}, []);

	const CopyButton = ({ text }) => (
		<button
			className="btn btn-sm btn-outline"
			onClick={() => copyToClipboard(text)}
		>
			{copiedText || "Copy"}
		</button>
	);

	const tabs = {
		windows: {
			title: "Windows",
			content: `
1. Visit the official Node.js website: https://nodejs.org
2. Download the LTS (Long Term Support) version for Windows
3. Run the installer and follow the installation wizard
4. Restart your computer after installation
5. Open Command Prompt and verify installation
      `,
		},
		mac: {
			title: "macOS",
			content: `
1. Visit the official Node.js website: https://nodejs.org
2. Download the LTS (Long Term Support) version for macOS
3. Run the installer package and follow the installation wizard
4. Restart your computer after installation
5. Open Terminal and verify installation
      `,
		},
		linux: {
			title: "Linux",
			content: `
1. Open a terminal window
2. Update your package manager:
   For Ubuntu/Debian: sudo apt update
   For Fedora: sudo dnf update
3. Install Node.js using your package manager:
   For Ubuntu/Debian: sudo apt install nodejs npm
   For Fedora: sudo dnf install nodejs npm
4. Verify installation
      `,
		},
		verify: {
			title: "Verify Installation",
			content: `
After installing Node.js, verify the installation by running these commands in your terminal or command prompt:

1. Check Node.js version:
   node --version

2. Check npm (Node Package Manager) version:
   npm --version

You should see version numbers displayed for both commands.
      `,
		},
		setup: {
			title: "Development Setup",
			content: `
To set up your development environment:

1. Install a code editor (if you haven't already). We recommend Visual Studio Code.
2. Install Git for version control.
3. Set up a GitHub account if you don't have one.
4. Configure Git with your name and email.
5. Create a new folder for your Node.js projects.
6. Initialize a new Node.js project in that folder.
      `,
		},
	};

	const codeSnippets = {
		verify: `node --version
npm --version`,
		gitConfig: `git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"`,
		newProject: `mkdir my-node-project
cd my-node-project
npm init -y`,
	};

	return (
		<div className="min-h-screen bg-base-100">
			<Navbar />
			<Head>
				<title>Node.js Installation and Setup Guide</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-2xl md:text-3xl font-bold mb-6">
					Node.js Installation and Setup Guide
				</h1>
				<div className="tabs tabs-boxed mb-4 flex flex-wrap justify-start">
					{Object.keys(tabs).map((tabKey) => (
						<a
							key={tabKey}
							className={`tab tab-sm md:tab-md ${
								activeTab === tabKey ? "tab-active" : ""
							} m-1`}
							onClick={() => setActiveTab(tabKey)}
						>
							{tabs[tabKey].title}
						</a>
					))}
				</div>
				<div className="bg-base-200 p-4 md:p-6 rounded-box">
					<h2 className="text-xl md:text-2xl font-semibold mb-4">
						{tabs[activeTab].title}
					</h2>
					<pre className="whitespace-pre-wrap text-sm md:text-base">
						{tabs[activeTab].content}
					</pre>
					{activeTab === "verify" && (
						<div className="mt-4">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
								<h4 className="text-lg font-semibold mb-2 md:mb-0">
									Verification Commands
								</h4>
								<CopyButton text={codeSnippets.verify} />
							</div>
							<div className="mockup-code text-xs md:text-sm">
								{codeSnippets.verify.split("\n").map((line, index) => (
									<pre key={index} data-prefix={index + 1}>
										<code>{line}</code>
									</pre>
								))}
							</div>
						</div>
					)}
					{activeTab === "setup" && (
						<div className="mt-4">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
								<h4 className="text-lg font-semibold mb-2 md:mb-0">
									Git Configuration
								</h4>
								<CopyButton text={codeSnippets.gitConfig} />
							</div>
							<div className="mockup-code text-xs md:text-sm">
								{codeSnippets.gitConfig.split("\n").map((line, index) => (
									<pre key={index} data-prefix={index + 1}>
										<code>{line}</code>
									</pre>
								))}
							</div>
							<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 mt-4">
								<h4 className="text-lg font-semibold mb-2 md:mb-0">
									Create a New Node.js Project
								</h4>
								<CopyButton text={codeSnippets.newProject} />
							</div>
							<div className="mockup-code text-xs md:text-sm">
								{codeSnippets.newProject.split("\n").map((line, index) => (
									<pre key={index} data-prefix={index + 1}>
										<code>{line}</code>
									</pre>
								))}
							</div>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default NodeSetup;
