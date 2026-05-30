"use client";

import { useAuth }
    from "@/context/AuthContext";

import { useRouter }
    from "next/navigation";

import { useEffect }
    from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const {
        user,
        loading,
        isAdmin
    } = useAuth();

    const router =
        useRouter();

    useEffect(() => {

        if (
            !loading &&
            (
                !user ||
                !isAdmin
            )
        ) {
            router.push(
                "/admin/login"
            );
        }

    }, [
        user,
        loading,
        isAdmin,
        router
    ]);
    if (
        loading ||
        !user ||
        !isAdmin
    ) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}