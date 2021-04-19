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
    user && sessionStorage.setItem("username", user.displayName.split(" ")[0]);
    sessionStorage.setItem("avatar", user.photoURL);
    const normalizedUser = user ? mapUserFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

export const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  try {
    let result = await auth.signInWithPopup(googleProvider);
    let credential = result.credential;
    let token = credential.accessToken;
    sessionStorage.setItem("token", token);
    window.location = "/";
  } catch (error) {
    console.info(error.code);
    console.info(error.message);
    console.info(error.credential);
  }
};

export const loginWithGithub = async () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  auth.useDeviceLanguage();
  try {
    let result = await auth.signInWithPopup(githubProvider);
    let credential = result.credential;
    let token = credential.accessToken;
    sessionStorage.setItem("token", token);
    window.location = "/";
  } catch (error) {
    console.info(error.code);
    console.info(error.message);
    console.info(error.credential);
  }
};

export const SignOut = async () => {
  try {
    await firebase.auth().signOut();
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("avatar");
    sessionStorage.removeItem("token");
    window.location = "/login";
  } catch (error) {
    console.info(error);
  }
};
