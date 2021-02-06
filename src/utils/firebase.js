import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDk5zifsov-B65dKvuWcz4OnrykexZ41zM",
    authDomain: "cade-a-gata.firebaseapp.com",
    projectId: "cade-a-gata",
    storageBucket: "cade-a-gata.appspot.com",
    messagingSenderId: "807324671721",
    appId: "1:807324671721:web:51ef3a461dcf39cce4da78"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
