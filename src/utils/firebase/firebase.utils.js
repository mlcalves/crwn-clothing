import { initializeApp} from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBXZI8F70yT-2QihVtZvXQEzVQp99TPzp0",
    authDomain: "crwn-clothing-db-16e83.firebaseapp.com",
    projectId: "crwn-clothing-db-16e83",
    storageBucket: "crwn-clothing-db-16e83.firebasestorage.app",
    messagingSenderId: "702135765008",
    appId: "1:702135765008:web:1ce5d60fd02f8c39932295"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // if user data don't exists
    if (!userSnapshot.exists()) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user',error.message);
      }
    }

    return userDocRef;
  }

