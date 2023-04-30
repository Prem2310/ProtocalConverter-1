const express = require("express");
const router = express.Router();

// * Firebase Configuration
const initializeApp = require("firebase/app").initializeApp;
const getFireStore = require("firebase/firestore").getFirestore;
const collection = require("firebase/firestore").collection;
const doc = require("firebase/firestore").doc;
const getDoc = require("firebase/firestore").getDoc;
const setDoc = require("firebase/firestore").setDoc;
const getDocs = require("firebase/firestore").getDocs;

const firebaseConfig = {
    apiKey: "AIzaSyDJyNwPFZs0mYxO_nFKaPebMrxmFa6D20o",
    authDomain: "hacknuthon-30f9f.firebaseapp.com",
    projectId: "hacknuthon-30f9f",
    storageBucket: "hacknuthon-30f9f.appspot.com",
    messagingSenderId: "1029665879450",
    appId: "1:1029665879450:web:2ee06c4d1cfa4563a93623",
    measurementId: "G-HFYY0NN4XY",
};
const firebase = initializeApp(firebaseConfig);
const db = getFireStore(firebase);

router.use((req, res, next) => {
    const time = new Date();
    console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${
            req.method
        } ${req.url}`
    );
    next();
});

router.get("/client/get(/*)", async (req, res) => {
    const clientId = req.url.split("/")[3];
    if (!clientId) {
        res.json({ error: "Client ID not provided" });
        return; // * Exit the function
    }
    const docRef = doc(db, "Client Config", clientId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        res.json({ data: docSnap.data() });
    } else {
        res.json({ error: "Client ID not found" });
    }
});

router.post("/client/post", async (req, res) => {
    const body = req.body;
    console.log("Someone posted to /client/post with the body:", body);
    if (!body) {
        res.json({ error: "No body provided" });
        return;
    }
    const allDocs = await collection(db, "Client Config");
    const allDocsSnap = await getDocs(allDocs);
    const totalData = allDocsSnap.docs.length;
    console.log("Total data:", totalData);
    await setDoc(doc(db, "Client Config", (totalData + 1).toString()), body);
    res.json({
        clientID: totalData + 1,
        message: "Data written succesfully to the database",
        data: body,
    });
});

module.exports = router;
