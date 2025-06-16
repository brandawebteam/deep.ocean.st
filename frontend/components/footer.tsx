"use client"

import Link from "next/link"
import SocialLinks from "@/components/social-links"
import Logo from "@/components/logo"
import SimpleButtonWithArrow from "@/components/simple-button-with-arrow"
import { fetchApiData } from "./api-fetcher"
import { useState, useEffect } from "react"

interface FooterSettings {
  contactMail: string
  contactDiscord: string
  showAboutPage: boolean
  showNewsPage: boolean
  showProjectsPage: boolean
  showCareersPage: boolean
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerSettings, setFooterSettings] = useState<FooterSettings | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchApiData("footer") 
      setFooterSettings(data)
    }
    loadSettings()
  }, [])
  
  return (
    <footer className="border-t border-border bg-background py-12 grid-bg">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Logo className="h-8" size="small" />
            <p className="mt-4 text-sm text-muted-foreground">
              Creating immersive gaming experiences that push the boundaries of imagination.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gradient">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Home
                </Link>
              </li>
              {footerSettings?.showNewsPage && (
              <li>
                <Link href="/news" className="text-muted-foreground hover-underline transition-colors duration-200">
                  News
                </Link>
              </li>
              )}
              {footerSettings?.showProjectsPage && (
              <li>
                <Link href="/projects" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Projects
                </Link>
              </li>
              )}
              {footerSettings?.showCareersPage && (
              <li>
                <Link href="/careers" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Careers
                </Link>
              </li>
              )}
              {footerSettings?.showAboutPage && (
              <li>
                <Link href="/about" className="text-muted-foreground hover-underline transition-colors duration-200">
                  About
                </Link>
              </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gradient">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover-underline transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gradient">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">
                Email:{" "}
                <a href={footerSettings?.contactMail} className="hover-underline transition-colors duration-200">
                  info@deepocean.games
                </a>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Discord:{" "}
                <a
                  href={footerSettings?.contactDiscord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-underline transition-colors duration-200"
                >
                  discord.gg/deepocean
                </a>
              </p>
            </address>
            <div className="mt-4">
              <SimpleButtonWithArrow
                href="/careers"
                variant="outline"
                size="sm"
                className="transition-all duration-300 hover:shadow-lg"
              >
                Open Positions
              </SimpleButtonWithArrow>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Deep Ocean Game Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
