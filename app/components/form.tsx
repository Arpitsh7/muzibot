"use client"
import React from "react"

export function Heading() {
  return (
    <h1 className="text-3xl font-bold tracking-tight">
      Create Account 🚀
    </h1>
  )
}

export function FormField({ label, children, dot }: {
  label: string
  children: React.ReactNode
  dot?: string
}) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label
        className={
          dot
            ? "after:ml-0.5 after:text-red-500 after:content-['*']"
            : ""
        }
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`rounded-xl bg-gray-100 p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 ${className}`}
    />
  )
}

export function Group({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {children}
    </div>
  )
}
