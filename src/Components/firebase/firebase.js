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
    const normalizedUser = user ? mapUserFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

const storage = (token, username, avatar) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("avatar", avatar);
  window.location = "/";
};

const errors = (err) => {
  console.info(err.code);
  console.info(err.message);
  console.info(err.credential);
};

export const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  try {
    let result = await auth.signInWithPopup(googleProvider);
    let credential = result.credential;
    let token = credential.idToken;
    storage(token, result.user.displayName.split(" ")[0], result.user.photoURL);
  } catch (error) {
    errors(error);
  }
};

export const loginWithGithub = async () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  auth.useDeviceLanguage();
  try {
    let result = await auth.signInWithPopup(githubProvider);
    let credential = result.credential;
    let token = credential.idToken;
    storage(token, result.user.displayName.split(" ")[0], result.user.photoURL);
  } catch (error) {
    errors(error);
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
