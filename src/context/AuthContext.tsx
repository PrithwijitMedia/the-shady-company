"use client";

import {
    User,
    onAuthStateChanged
} from "firebase/auth";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { auth } from "@/lib/firebase";
import { getAdminUser }
    from "@/lib/admin";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext =
    createContext<AuthContextType>({
        user: null,
        loading: true,
        isAdmin: false
    });


export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [isAdmin, setIsAdmin] =
        useState(false);

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                /*(firebaseUser) => {
        
                  setUser(firebaseUser);
        
                  setLoading(false);
                }*/
                async (firebaseUser) => {

                    setUser(firebaseUser);

                    if (
                        firebaseUser?.email
                    ) {

                        const adminDoc =
                            await getAdminUser(
                                firebaseUser.email
                            );

                        if (
                            adminDoc?.active === true &&
                            adminDoc?.role === "super_admin"
                        ) {

                            setIsAdmin(true);

                        } else {

                            setIsAdmin(false);
                        }

                    } else {

                        setIsAdmin(false);
                    }

                    setLoading(false);
                }
            );

        return unsubscribe;

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}