// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "./key.json" assert { type: "json" };


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDw6v0xXfiW7oeio1gQgHOkrT5w_WUt2C0",
//     authDomain: "estudy-876c0.firebaseapp.com",
//     projectId: "estudy-876c0",
//     storageBucket: "estudy-876c0.appspot.com",
//     messagingSenderId: "469946359548",
//     appId: "1:469946359548:web:d41e91444ac9419d47c179",
//     measurementId: "G-G6PLTNYZY1"
// };

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "gs://estudy-876c0.appspot.com"
});

export const bucket = getStorage().bucket();