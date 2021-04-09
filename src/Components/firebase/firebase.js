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

export const signInWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  auth.useDeviceLanguage();
  try {
    await auth.signInWithPopup(googleProvider);
    window.location = "/";
  } catch (error) {
    console.info(error.message);
  }
};
