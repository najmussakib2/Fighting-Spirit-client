import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Create context API
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  // State
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [fullLoading, setFullLoading] = useState(true);

  // Registration
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Profile Update
  const profileUpdate = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logout = () => {
    return signOut(auth);
  };

  // State observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser?.email) {
        axios
          .post(`${import.meta.env.VITE_SERVER_API}/jwt`, {
            email: currentUser.email,
          })
          .then((response) => {
            localStorage.setItem(
              "summerCamp-access-token",
              response.data.token
            );
            setLoading(false);
            setFullLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            setFullLoading(false);
            console.log(error);
          });
      } else {
        localStorage.removeItem("summerCamp-access-token");
        setLoading(false);
        setFullLoading(false);
      }

      return () => {
        return unsubscribe();
      };
    });
  }, []);

  // Data sent as context API
  const authInfo = {
    loading,
    setLoading,
    fullLoading,
    setFullLoading,
    user,
    setUser,
    createUser,
    profileUpdate,
    loginUser,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
