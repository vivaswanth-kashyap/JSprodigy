import React, { useState, useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const Postman = () => {
	const [activeTab, setActiveTab] = useState("introduction");
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
		introduction: {
			title: "Introduction to Postman",
			content: `
Postman is a popular API development and testing tool. It allows you to:
- Send HTTP requests
- Organize API endpoints
- Automate testing
- Create and share API documentation
This guide will help you download and set up Postman on different operating systems.
      `,
		},
		windows: {
			title: "Download for Windows",
			content: `
To download and install Postman on Windows:
1. Visit the official Postman website: https://www.postman.com/downloads/
2. Click on the "Download" button for Windows
3. Once downloaded, run the installer (.exe file)
4. Follow the installation wizard instructions
5. After installation, launch Postman from the Start menu
      `,
		},
		mac: {
			title: "Download for macOS",
			content: `
To download and install Postman on macOS:
1. Go to the Postman downloads page: https://www.postman.com/downloads/
2. Click on the "Download" button for macOS
3. Once downloaded, open the .dmg file
4. Drag the Postman icon to the Applications folder
5. Launch Postman from the Applications folder or Launchpad
      `,
		},
		linux: {
			title: "Download for Linux",
			content: `
To install Postman on Linux:
1. Visit: https://www.postman.com/downloads/
2. Download the appropriate package for your Linux distribution
3. Extract the downloaded file, e.g., 
   tar -xzf postman-linux-x64.tar.gz
4. Move Postman to /opt directory:
   sudo mv Postman /opt
5. Create a symbolic link:
   sudo ln -s /opt/Postman/Postman /usr/bin/postman
6. Launch Postman by typing 'postman' in the terminal
      `,
		},
		setup: {
			title: "Initial Setup",
			content: `
After installing Postman, follow these steps to get started:
1. Launch Postman
2. You can choose to create an account or skip sign-in
3. Familiarize yourself with the interface:
   - New button: Create new requests, collections, etc.
   - Collections pane: Organize your API requests
   - Request builder: Construct and send HTTP requests
   - Response pane: View API responses
4. Try sending a GET request to https://postman-echo.com/get
      `,
		},
	};

	return (
		<div className="min-h-screen bg-base-100">
			<Navbar />
			<Head>
				<title>Getting Started with Postman</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">
					Getting Started with Postman
				</h1>
				<div className="tabs tabs-boxed mb-4">
					{Object.keys(tabs).map((tabKey) => (
						<a
							key={tabKey}
							className={`tab ${activeTab === tabKey ? "tab-active" : ""}`}
							onClick={() => setActiveTab(tabKey)}
						>
							{tabs[tabKey].title}
						</a>
					))}
				</div>
				<div className="bg-base-200 p-6 rounded-box">
					<h2 className="text-2xl font-semibold mb-4">
						{tabs[activeTab].title}
					</h2>
					<pre className="whitespace-pre-wrap">{tabs[activeTab].content}</pre>
					{activeTab === "setup" && (
						<div className="mt-4">
							<div className="flex justify-between items-center mb-2">
								<h4 className="text-lg font-semibold">Example GET Request</h4>
								<CopyButton text="GET https://postman-echo.com/get" />
							</div>
							<div className="mockup-code">
								<pre data-prefix="1">
									<code>GET https://postman-echo.com/get</code>
								</pre>
							</div>
						</div>
					)}
				</div>
				<div className="mt-6 text-sm text-gray-600">
					<h3 className="text-lg font-semibold mb-2">Disclaimer:</h3>
					<p>
						Postman® is a registered trademark of Postman, Inc. This tutorial is
						for educational purposes only and is not affiliated with or endorsed
						by Postman, Inc. For the most up-to-date information, please visit
						the official Postman website at{" "}
						<a href="https://www.postman.com" target="_blank">
							https://www.postman.com.
						</a>
					</p>
				</div>
			</main>
		</div>
	);
};

export default Postman;
