import Routing from "./containers/Routing/Routing";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "./App.css";

function App() {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyCHaxHbuR6sChJD2O27lCoZGjjwp1Q-Sho",
        authDomain: "functionality-c0aad.firebaseapp.com",
        projectId: "functionality-c0aad",
        storageBucket: "functionality-c0aad.appspot.com",
        messagingSenderId: "684228519572",
        appId: "1:684228519572:web:f9a5ae72b826cf34d57681",
        measurementId: "G-8LVJ6JL8B9",
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    return <div className="App"><Routing /></div>;
}

export default App;
