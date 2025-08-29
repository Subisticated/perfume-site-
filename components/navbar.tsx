"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [logo, setLogo] = useState<string>("/images/logo.png")

  useEffect(() => {
    fetch("/api/logo")
      .then(res => res.json())
      .then(data => {
        if (data.logoBase64) setLogo(data.logoBase64)
      })
      .catch(() => {})
  }, [])

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Perfume Shop Logo"
            className="h-8 w-8 rounded bg-fuchsia-600"
          />
          <span className="text-lg font-semibold text-slate-900">Perfume Shop</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-slate-700 transition-colors hover:text-slate-900">
            Home
          </Link>
        </nav>

        <button
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5 text-slate-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            <Link
              href="/"
              className="rounded px-2 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
