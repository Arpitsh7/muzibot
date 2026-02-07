"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "../api/lib/auth-client"
import { useRouter } from "next/navigation"

export default function Signin() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError(null)

    const res = await signIn.email({
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      setError(res.error.message || "Signin failed")
    }
  }

  // redirect after login
  useEffect(() => {
    async function checkRole() {
      const res = await fetch("/api/role")
      const data = await res.json()

      if (!data.authenticated) return

      if (data.isDriver) {
        router.push("/driver/dashboard")
      } else {
        router.push("/rider/dashboard")
      }
    }

    if (!isPending && session) {
      checkRole()
    }
  }, [session, isPending, router])

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSignin}
        className="w-full max-w-md px-8 py-14 bg-gray-50 text-center"
      >
        <Heading />

        <div className="mx-auto my-4 flex flex-col gap-8">
          <FormField label="Email" dot="yes">
            <Input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </FormField>

          <FormField label="Password" dot="yes">
            <Input
              type="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </FormField>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black transition-all duration-150 text-white px-4 py-3 rounded-md cursor-pointer hover:-translate-y-0.5 active:scale-98 after:content-[''] after:w-1/2 after:h-[400px] after:absolute after:bg-white/20 relative overflow-hidden after:-left-20 after:-top-20 after:rotate-10 after:-translate-x-20 hover:after:translate-x-[200%] after:backdrop-blur-[0.5px] after:transition-all after:duration-1000 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In Now"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function Heading() {
  return (
    <h1 className="text-4xl font-bold tracking-tighter bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-600 selection:bg-black selection:text-white">
      Welcome{" "}
      <span className="relative z-10 inline-block text-white after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:-skew-10 after:bg-red-500">
        back
      </span>
    </h1>
  )
}

function FormField({
  label,
  children,
  dot,
}: {
  label: string
  children: React.ReactNode
  dot?: string
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label
        className={
          dot ? "after:ml-0.5 after:text-red-500 after:content-['*']" : ""
        }
      >
        {label}
      </label>
      {children}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-xl bg-gray-100 p-4 placeholder:text-neutral-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:offset-2"
    />
  )
}