"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  className?: string
  size?: "small" | "large"
}

export default function Logo({ className, size = "small" }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the logo based on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Set dimensions based on size prop
  const dimensions = size === "small" ? { width: 90, height: 60 } : { width: 300, height: 120 }

  if (!mounted) {
    // Return a placeholder with the same dimensions during SSR
    return <div className={`h-${dimensions.height / 4} w-${dimensions.width / 4} ${className}`} />
  }

  // Use the dark logo for both themes 
  // Note: This is the dark logo (black on transparent) being used for dark theme 
  const logoSrc = size !== "small" ? "/images/logo-dark.png" : "/images/dark-logo-small.png"

  return (
    <Link href="/" className={`block ${className} `}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Deep Ocean Game Design"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className={`h-full w-auto max-h-full ${resolvedTheme === "dark" ? "invert" : ""}`}
      />
    </Link>
  )
}
