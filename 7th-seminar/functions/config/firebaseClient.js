const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBeqNeEKWTV6Wt8cvvxeEj-LmcaEvLQg98",
  authDomain: "wesopt29-e30ad.firebaseapp.com",
  projectId: "wesopt29-e30ad",
  storageBucket: "wesopt29-e30ad.appspot.com",
  messagingSenderId: "904030704954",
  appId: "1:904030704954:web:f0de09a05146317529ac03",
  measurementId: "G-D5BHHFGNGD"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };