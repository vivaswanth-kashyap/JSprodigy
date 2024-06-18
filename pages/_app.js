import "@/styles/globals.css";
import { ThemeProvider } from "../contexts/themeContext";

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
