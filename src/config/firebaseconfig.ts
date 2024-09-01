import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIfTu0CRjPiCluY1eoBR2Gc4HIWkqteeU",
  authDomain: "dragones-659ee.firebaseapp.com",
  projectId: "dragones-659ee",
  storageBucket: "dragones-659ee.appspot.com",
  messagingSenderId: "869273311393",
  appId: "1:869273311393:web:979b700df9b6966fb0f8e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);