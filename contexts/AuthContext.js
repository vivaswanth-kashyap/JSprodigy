import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/Firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
