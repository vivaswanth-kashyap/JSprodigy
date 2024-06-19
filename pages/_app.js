import "@/styles/globals.css";
import { ThemeProvider } from "../contexts/themeContext";
import fbconfig from "../firebase/Firebase";
import { initializeApp } from "firebase/app";
import { AuthProvider } from "../contexts/AuthContext";

const app = initializeApp(fbconfig);

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthProvider>
	);
}
