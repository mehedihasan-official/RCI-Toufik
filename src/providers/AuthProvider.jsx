"use client";

import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [resortData, setResortData] = useState([]);
  const [allResortData, setAllResortData] = useState([]);
  const [allBookingsData, setAllBookingsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsData, setBookingsData] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
  const [paymentInfoData, setPaymentInfoData] = useState(null);

  // Auth Methods
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;

      const response = await fetch(`/api/users?email=${email}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setRole(userData.isAdmin ? "admin" : "user");
        await fetchBookingsData(email);
      }
      return firebaseUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (name, email, password, membership) => {
    setLoading(true);
    try {
      // Check if user already exists
      const checkResponse = await fetch(`/api/users?email=${email}`);
      if (checkResponse.ok) {
        throw new Error("User already exists");
      }

      // Create Firebase user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = result.user;

      // Create user in MongoDB
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photoURL: firebaseUser.photoURL,
          membership,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setRole("user");
      }
      return firebaseUser;
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const { email, displayName, photoURL } = firebaseUser;

      // Check if user exists
      const checkResponse = await fetch(`/api/users?email=${email}`);

      if (checkResponse.status === 404) {
        // User doesn't exist, create new user
        const response = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: displayName,
            email,
            photoURL,
            membership: "Bronze",
          }),
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setRole("user");
        }
      } else if (checkResponse.ok) {
        // User exists
        const userData = await checkResponse.json();
        setUser(userData);
        setRole(userData.isAdmin ? "admin" : "user");
        await fetchBookingsData(email);
      }

      return firebaseUser;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setRole("user");
      setBookingsData([]);
      setPaymentInfoData(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // User Management
  const updateUser = async (email, isAdmin) => {
    try {
      const response = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isAdmin }),
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error("Failed to update user");
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  };

  const removeUser = async (email) => {
    try {
      const response = await fetch("/api/delete-users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error("Failed to remove user");
    } catch (error) {
      console.error("Remove user error:", error);
      throw error;
    }
  };

  // Data Fetching
  const fetchResortData = async (page = 1, limit = 15) => {
    try {
      const response = await fetch(`/api/resorts?page=${page}&limit=${limit}`);
      if (response.ok) {
        const data = await response.json();
        setResortData(data.resorts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      }
    } catch (error) {
      console.error("Fetch resort data error:", error);
    }
  };

  const fetchAllResorts = async () => {
    try {
      const response = await fetch("/api/all-resorts");
      if (response.ok) {
        const data = await response.json();
        setAllResortData(data);
      }
    } catch (error) {
      console.error("Fetch all resorts error:", error);
    }
  };

  const fetchBookingsData = async (email) => {
    try {
      const response = await fetch(`/api/bookings?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setBookingsData(data);
      }
    } catch (error) {
      console.error("Fetch bookings data error:", error);
    }
  };

  const fetchAllBookingsData = async () => {
    try {
      const response = await fetch("/api/all-bookings");
      if (response.ok) {
        const data = await response.json();
        setAllBookingsData(data);
      }
    } catch (error) {
      console.error("Fetch all bookings error:", error);
    }
  };

  const fetchAllUsersData = async () => {
    try {
      const response = await fetch("/api/all-users");
      if (response.ok) {
        const data = await response.json();
        setAllUsersData(data);
      }
    } catch (error) {
      console.error("Fetch all users error:", error);
    }
  };

  const fetchPaymentInformation = async (email) => {
    try {
      const response = await fetch(`/api/bookings?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setPaymentInfoData(data[0]);
        }
      }
    } catch (error) {
      console.error("Fetch payment info error:", error);
    }
  };

  const setUserRole = async (email) => {
    try {
      const response = await fetch(`/api/users?email=${email}`);
      if (response.ok) {
        const userData = await response.json();
        setRole(userData.isAdmin ? "admin" : "user");
      }
    } catch (error) {
      console.error("Set user role error:", error);
    }
  };

  // Setup Auth Listener
  useEffect(() => {
    fetchResortData(1, 15);
    fetchAllResorts();
    fetchAllBookingsData();
    fetchAllUsersData();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch(
            `/api/users?email=${firebaseUser.email}`,
          );
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setRole(userData.isAdmin ? "admin" : "user");
            await fetchBookingsData(firebaseUser.email);
          }
        } catch (error) {
          console.error("Auth state change error:", error);
        }
      } else {
        setUser(null);
        setRole("user");
        setBookingsData([]);
        setPaymentInfoData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    role,
    resortData,
    allResortData,
    allBookingsData,
    totalPages,
    currentPage,
    bookingsData,
    allUsersData,
    paymentInfoData,
    login,
    createUser,
    googleLogin,
    signOut,
    updateUser,
    removeUser,
    fetchResortData,
    fetchAllResorts,
    fetchBookingsData,
    fetchAllBookingsData,
    fetchAllUsersData,
    fetchPaymentInformation,
    setUserRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
