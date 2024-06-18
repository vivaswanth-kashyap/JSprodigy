import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(null);

	const getUserPreferredTheme = () => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return "night";
		} else {
			return "cmyk";
		}
	};

	useEffect(() => {
		const userPreferredTheme = getUserPreferredTheme();
		setTheme(userPreferredTheme);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "night" ? "cmyk" : "night");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
