"use client"
import { useState } from "react"
import { signUp } from "../api/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "../api/lib/auth-client" 
export default function Signup() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, isPending } = useSession()
  const router = useRouter()

  async function handleSignup() {
    if (password.length < 6) {
      setError("Password must be at least 6 letters long")
      return
    }
    setError(null)
    setLoading(true)
    const res = await signUp.email({
      name: name,
      email: email,
      password: password,
    })

    setLoading(false)
    if (res?.error) {
      setError(res.error.message || "Signup Failed")
    } else {
      setSuccess(true)
      console.log("Signup Success")
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen w-full relative bg-white">
      {/* Purple Glow Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top center,
              rgba(173, 109, 244, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="w-full min-h-screen flex justify-center items-center relative z-10">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSignup()
          }}
          className="w-full max-w-md px-8 py-14 bg-gray-50 text-center shadow-xl rounded-lg"
        >
          <Heading />

          <div className="mx-auto my-4 flex flex-col gap-8">
            <FormField label="Name" dot="yes">
              <Input
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Email" dot="yes">
              <Input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Password" dot="yes">
              <Input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormField>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Signup successful!</p>}

            <div className="flex flex-col gap-4 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-black transition-all duration-150 text-white px-4 py-3 rounded-md cursor-pointer hover:-translate-y-0.5 active:scale-98 after:content-[''] after:w-1/2 after:h-[400px] after:absolute after:bg-white/20 relative overflow-hidden after:-left-20 after:-top-20 after:rotate-10 after:-translate-x-20 hover:after:translate-x-[200%] after:backdrop-blur-[0.5px] after:transition-all after:duration-1000 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing up..." : "Sign Up Now"}
              </button>
            </div>
            <Link href="/signin">
            <div className="flex flex-col gap-4 mt-2 text-neutral-400 font-md underline">
              Already,Signup
            </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

function Heading() {
  return (
    <h1 className="text-4xl font-bold tracking-tighter text-neutral-600 selection:bg-black selection:text-white">
      Crazy {" "}
      <span className="relative ml-1 mr-1 pb-1.5 pr-2 pl-1 pt-1 z-10 inline-block text-white after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:-skew-10 after:bg-red-500">
        Song
      </span>
      {"  "} Queue
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
          dot
            ? " text-neutral-300 font-display after:ml-0.5 after:text-red-500 after:content-['*']"
            : ""
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
      className="text-neutral-700 font-display rounded-xl bg-gray-100 p-4 placeholder:text-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:offset-2"
    />
  )
}