import "@/styles/globals.css";
import { ThemeProvider } from "../contexts/themeContext";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }) {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthProvider>
	);
}
