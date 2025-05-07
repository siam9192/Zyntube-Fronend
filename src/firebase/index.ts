// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDEIsLYXQCD44D6heB2TeHjpNIZOQ2LaCo",
//   authDomain: "zyntube-2fe6e.firebaseapp.com",
//   projectId: "zyntube-2fe6e",
//   storageBucket: "zyntube-2fe6e.firebasestorage.app",
//   messagingSenderId: "943572278291",
//   appId: "1:943572278291:web:c7ec1492ad7dc18d5f73e6"
// };

const firebaseConfig = {
  apiKey: 'AIzaSyDcik68tY3jonTQ7p3YK8Fxh03_3XR-A2M',
  authDomain: 'zyntube-336c2.firebaseapp.com',
  projectId: 'zyntube-336c2',
  storageBucket: 'zyntube-336c2.firebasestorage.app',
  messagingSenderId: '922882385926',
  appId: '1:922882385926:web:9b597508c93c39e079fb87',
  measurementId: 'G-6DY8B2FVZW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
