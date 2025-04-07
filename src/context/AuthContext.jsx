import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  updatePassword
} from 'firebase/auth';
import { ref, set, serverTimestamp, push } from 'firebase/database';
import { database } from '../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Đăng ký tài khoản mới
  const signup = async (email, password, username) => {
    // Tạo user với email và password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Cập nhật profile với username
    await updateProfile(userCredential.user, {
      displayName: username
    });

    // Tạo document user trong Realtime Database
    const userRef = ref(database, `users/${userCredential.user.uid}`);
    await set(userRef, {
      username,
      email,
      createdAt: serverTimestamp()
    });

    return userCredential;
  };

  // Đăng nhập với email/password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Đăng nhập với Google
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };


  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cập nhật tên và ảnh đại diện
  const updateProfileInfo = async (username, photoURL) => {
    try {
      if (!user) throw new Error("No user logged in");
      
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: photoURL
      });
      
      // Cập nhật state user với thông tin mới
      setUser({ ...auth.currentUser });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Cập nhật mật khẩu
  const changePassword = async (newPassword) => {
    if (user) {
      await updatePassword(user, newPassword);
    }
  };

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateProfileInfo,
    changePassword,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 