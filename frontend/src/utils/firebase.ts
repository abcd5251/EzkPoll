import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAYZxMZXNWDqHL5tRdDQ5Q2L-V_3Qr047g",
    authDomain: "ethtaipeihackathon.firebaseapp.com",
    databaseURL: "https://ethtaipeihackathon-default-rtdb.firebaseio.com",
    projectId: "ethtaipeihackathon",
    storageBucket: "ethtaipeihackathon.appspot.com",
    messagingSenderId: "261318115960",
    appId: "1:261318115960:web:c53cbfbdfe85638ec1e38d",
    measurementId: "G-4X09S8R6PJ"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, firestore, storage };