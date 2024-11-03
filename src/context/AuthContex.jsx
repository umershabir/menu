// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// // import supabase from "../lib/supabaseClient";
// import supabase from "../lib/supabase";
// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get initial session
//     const getInitialSession = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         setUser(session?.user ?? null);
//       } catch (error) {
//         console.error("Error getting initial session:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getInitialSession();

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// context/AuthContext.js
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "../lib/supabase";

// const AuthContext = createContext({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check active sessions and subscribe to auth changes
//     const checkUser = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabase.auth.getSession();
//         setUser(session?.user || null);
//       } catch (error) {
//         console.error("Error checking auth:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       setUser(session?.user || null);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signInWithGoogle = async (redirectPath = null) => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: `${window.location.origin}${
//             redirectPath || window.location.pathname
//           }`,
//         },
//       });
//       if (error) throw error;
//     } catch (error) {
//       console.error("Error signing in with Google:", error.message);
//       throw error;
//     }
//   };

//   const signOut = async () => {
//     try {
//       await supabase.auth.signOut();
//       navigate("/menu/default");
//     } catch (error) {
//       console.error("Error signing out:", error.message);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     signInWithGoogle,
//     signOut,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;
// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Now this will work as AuthProvider is inside Router

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async (redirectPath = null) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${
            redirectPath || window.location.pathname
          }`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/menu/default");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
