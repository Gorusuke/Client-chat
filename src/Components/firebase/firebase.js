import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqhxD_ZBTu8vtqR-ktxkCsDnUffk4t-I4",
  authDomain: "new-chat-e2128.firebaseapp.com",
  projectId: "new-chat-e2128",
  storageBucket: "new-chat-e2128.appspot.com",
  messagingSenderId: "210812054219",
  appId: "1:210812054219:web:21624b71b6f5836033c94e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

const auth = firebase.auth();

const mapUserFromFirebase = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const authStateChange = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    user && localStorage.setItem("token", JSON.stringify(user));
    const normalizedUser = user ? mapUserFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

export const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  try {
    const user = await auth.signInWithPopup(googleProvider);
    console.info(user);
    // window.location = "/";
  } catch (error) {
    console.info(error.message);
  }
};

export const loginWithGithub = async () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  auth.useDeviceLanguage();
  try {
    const user = await auth.signInWithPopup(githubProvider);
    console.info(user);
  } catch (error) {
    console.info(error.message);
  }
};

export const SignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.info(error);
  }
};
