import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onSnapshot, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
  }) 


  const logout = async () => {
    setLoading(true);
    signOut(auth).catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  
  return (
    <AuthContext.Provider value={{user, error, logout}}>
        {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}

