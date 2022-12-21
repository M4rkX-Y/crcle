import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setLoadingInitial(false);
    });
  }) 


  const logout = async () => {
    setLoading(true)
    signOut(auth).catch((error) => setError(error))
    .finally(() => setLoading(false))
  }

  
  return (
    <AuthContext.Provider value={{user, loading, error, logout}}>
        {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext);
}

