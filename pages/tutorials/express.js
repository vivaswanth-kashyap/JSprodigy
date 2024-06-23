import { useState, useCallback } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const Express = () => {
	const [activeTab, setActiveTab] = useState("setup");
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
		setup: {
			title: "Project Setup",
			content: `
1. Create a new folder for the project
2. Run \`npm init -y\`
3. Install dependencies:
   \`npm install express mongodb\`
4. Create the following folder structure:
   - config
   - data
   - routes
   - helpers
   - app.js (file)
      `,
		},
		config: {
			title: "Configuration Files",
			content: `
Inside the config folder, create 3 files:
1. MongoConnection.js
2. MongoCollections.js
3. settings.js
These files handle database connection, collection management, and configuration settings.
      `,
		},
		appjs: {
			title: "app.js Setup",
			content: `
In app.js, set up the Express server with the following:
- Import required modules
- Set up middleware
- Configure routes
- Start the server

Here's the complete code for app.js:
      `,
		},
		routes: {
			title: "Routing Setup",
			content: `
In the routes folder, create an index.js file to manage all your routes.
This file will import individual route files and combine them.

Here's an example of how to set up your routes/index.js:
      `,
		},
	};

	const codeSnippets = {
		MongoConnection: `import { MongoClient } from "mongodb";
import { mongoConfig } from "./settings.js";

let _connection = undefined;
let _db = undefined;

const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    _db = _connection.db(mongoConfig.database);
  }
  return _db;
};

const closeConnection = async () => {
  await _connection.close();
};

export { dbConnection, closeConnection };`,
		MongoCollections: `import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
  let _col = undefined;
  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }
    return _col;
  };
};

export const users = getCollectionFn("users");`,
		settings: `export const mongoConfig = {
  serverUrl: "mongodb://localhost:27017",
  database: "myApp",
};`,
		appjs: `// This file sets up the express server as shown in the lecture code
import express from "express";
const app = express();
import configRoutesFunction from "./routes/index.js";

app.use(express.json());

configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});`,
		routes: `import homePageRoutes from "./home.js";
import courseRoutes from "./course.js";
import userRoutes from "./user.js";

const constructorMethod = (app) => {
  app.use("/", homePageRoutes);
  app.use("/courses", courseRoutes);
  app.use("/users", userRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;

// You can add more routes in a similar way by creating new route files
// and importing them here.`,
	};

	return (
		<div className="min-h-screen bg-base-100">
			<Navbar />
			<Head>
				<title>Getting Started with Express and MongoDB</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">
					Getting Started with Express and MongoDB
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
					{(activeTab === "appjs" || activeTab === "routes") && (
						<div className="mt-4">
							<div className="flex justify-between items-center mb-2">
								<h4 className="text-lg font-semibold">
									{activeTab === "appjs" ? "app.js" : "routes/index.js"}
								</h4>
								<CopyButton text={codeSnippets[activeTab]} />
							</div>
							<div className="mockup-code">
								{codeSnippets[activeTab].split("\n").map((line, index) => (
									<pre key={index} data-prefix={index + 1}>
										<code>{line}</code>
									</pre>
								))}
							</div>
						</div>
					)}
				</div>
				{activeTab === "config" && (
					<div className="mt-6">
						<h3 className="text-xl font-semibold mb-2">File Contents:</h3>
						<div className="grid grid-cols-1 gap-4">
							{Object.entries(codeSnippets)
								.filter(([name]) => !["appjs", "routes"].includes(name))
								.map(([name, code]) => (
									<div key={name} className="card bg-base-200 shadow-xl">
										<div className="card-body">
											<div className="flex justify-between items-center mb-2">
												<h4 className="card-title">{name}.js</h4>
												<CopyButton text={code} />
											</div>
											<div className="mockup-code">
												{code.split("\n").map((line, index) => (
													<pre key={index} data-prefix={index + 1}>
														<code>{line}</code>
													</pre>
												))}
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Express;
