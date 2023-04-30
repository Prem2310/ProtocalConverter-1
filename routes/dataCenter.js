const express = require("express");
const router = express.Router();

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

router.get("/all", async (req, res) => {
    const allDocs = await collection(db, "Data Center");
    const allDocsSnap = await getDocs(allDocs);
    let result = [];
    allDocsSnap.docs.forEach((doc) => {
        result.push(doc.data());
    });
    res.json({ data: result });
});

router.get("/register/(*)", async (req, res) => {
    console.log("Meow");
});

module.exports = router;
