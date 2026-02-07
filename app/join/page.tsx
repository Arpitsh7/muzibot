"use client"
import { useSession } from "../api/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Join() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.isPending) return;

        if (session.data?.user) {
            router.replace("/dashboard");
        } else {
            router.replace("/signup");
        }
    }, [session.isPending]); // important change

    return <p>Checking session...</p>;
}
