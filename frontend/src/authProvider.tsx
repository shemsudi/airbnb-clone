// import { createContext, useContext, useEffect, ReactNode } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { selectModals } from "./redux/ModalReducer";
// import { lazy, Suspense } from "react";
// import { initializeAuth } from "./utils/authIntializer";

// const Signup = lazy(() => import("./modal/signup"));

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<null>(null);

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const dispatch = useDispatch();
//   const { isLoginPage, isVerifyPage, isSignupPage } = useSelector(selectModals);
//   const isopen = isLoginPage || isVerifyPage || isSignupPage;

//   let isInitialized = false;

//   useEffect(() => {
//     if (!isInitialized) {
//       isInitialized = true;
//       initializeAuth(dispatch);
//     }
//   }, [dispatch]);

//   return (
//     <AuthContext.Provider value={null}>
//       {children}
//       {isopen && (
//         <Suspense fallback={<div>Loading...</div>}>
//           <Signup />
//         </Suspense>
//       )}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
