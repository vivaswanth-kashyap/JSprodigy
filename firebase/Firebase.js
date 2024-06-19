import { initializeApp } from "firebase/app";

const fbconfig = {
	apiKey: process.env.NEXT_PUBLIC_fbApiKey,
	authDomain: process.env.NEXT_PUBLIC_fbAuthDomain,
	projectId: process.env.NEXT_PUBLIC_fbProjectId,
	storageBucket: process.env.NEXT_PUBLIC_fbStorageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_fbMessagingSenderId,
	appId: process.env.NEXT_PUBLIC_fbAppId,
};

const app = initializeApp(fbconfig);

export default app;
