"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import Logo from "@/components/logo"
import { fetchApiData } from "./api-fetcher"
interface HeaderSettings {
  showAboutPage: boolean
  showNewsPage: boolean
  showProjectsPage: boolean
  showCareersPage: boolean
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchApiData("header") 
      setHeaderSettings(data)
    }
    loadSettings()
  }, [])
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-2 md:px-4">
        <Logo className="h-8" size="small" />

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/" className="text-sm font-medium hover-underline transition-colors duration-200">
            Home
          </Link>
          {headerSettings?.showNewsPage && (
            <Link href="/news" className="text-sm font-medium hover-underline transition-colors duration-200">
              News
            </Link>
          )}
          {headerSettings?.showProjectsPage && (
            <Link href="/projects" className="text-sm font-medium hover-underline transition-colors duration-200">
              Projects
            </Link>
          )}
          {headerSettings?.showCareersPage && (
            <Link href="/careers" className="text-sm font-medium hover-underline transition-colors duration-200">
              Careers
            </Link>
          )}
          {headerSettings?.showAboutPage && (
            <Link href="/about" className="text-sm font-medium hover-underline transition-colors duration-200">
              About
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-b border-border bg-background/95 backdrop-blur-sm px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium hover-color-shift transition-colors duration-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {headerSettings?.showNewsPage && (
              <Link href="/news" className="text-sm font-medium" onClick={toggleMenu}>
                News
              </Link>
            )}
            {headerSettings?.showProjectsPage && (
              <Link href="/projects" className="text-sm font-medium" onClick={toggleMenu}>
                Projects
              </Link>
            )}
            {headerSettings?.showCareersPage && (
              <Link href="/careers" className="text-sm font-medium" onClick={toggleMenu}>
                Careers
              </Link>
            )}
            {headerSettings?.showAboutPage && (
              <Link href="/about" className="text-sm font-medium" onClick={toggleMenu}>
                About
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
