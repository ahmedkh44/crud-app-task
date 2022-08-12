import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAZleiaXW1G2TrORvHnjScGGcJ9T_jdD2A",
  authDomain: "fb-crud-ffa2b.firebaseapp.com",
  projectId: "fb-crud-ffa2b",
  storageBucket: "fb-crud-ffa2b.appspot.com",
  messagingSenderId: "431682778262",
  appId: "1:431682778262:web:f8f7eca32d413868a97eb7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);