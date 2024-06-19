import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	updateProfile,
	signInWithEmailAndPassword,
	updatePassword,
	signInWithPopup,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";

// Function to sign in with Google
const doSocialSignIn = async () => {
	let auth = getAuth();
	let socialProvider = new GoogleAuthProvider();
	await signInWithPopup(auth, socialProvider);
};

// Function to sign up with email and password
const doSignUp = async (email, password) => {
	let auth = getAuth();
	await createUserWithEmailAndPassword(auth, email, password);
};

// Function to sign in with email and password
const doSignIn = async (email, password) => {
	let auth = getAuth();
	await signInWithEmailAndPassword(auth, email, password);
};

// Function to sign out
const doSignOut = async () => {
	let auth = getAuth();
	await signOut(auth);
};

// Function to update user profile
const doUpdateProfile = async (displayName, photoURL) => {
	let auth = getAuth();
	await updateProfile(auth.currentUser, {
		displayName: displayName,
		photoURL: photoURL,
	});
};

// Function to update user password
const doUpdatePassword = async (newPassword) => {
	let auth = getAuth();
	await updatePassword(auth.currentUser, newPassword);
};

// Function to send password reset email
const doSendPasswordResetEmail = async (email) => {
	let auth = getAuth();
	await sendPasswordResetEmail(auth, email);
};

// Function to reauthenticate user
const doReauthenticate = async (currentPassword) => {
	let auth = getAuth();
	let credential = EmailAuthProvider.credential(
		auth.currentUser.email,
		currentPassword
	);
	await reauthenticateWithCredential(auth.currentUser, credential);
};

const getAccessToken = async () => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user) {
		const token = await user.getIdToken();
		return token;
	}
	return null;
};

export {
	doSocialSignIn,
	doSignUp,
	doSignIn,
	doSignOut,
	doUpdateProfile,
	doUpdatePassword,
	doSendPasswordResetEmail,
	doReauthenticate,
	getAccessToken,
};
