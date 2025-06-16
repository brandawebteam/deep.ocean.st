import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SimpleButtonWithArrowProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  external?: boolean
}

export default function SimpleButtonWithArrow({
  href,
  children,
  variant = "default",
  size = "default",
  className,
  external = false,
}: SimpleButtonWithArrowProps) {
  return (
    <Button variant={variant} size={size} className={cn("group", className)} asChild>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="button-arrow-container">
          <span className="button-arrow-text">{children}</span>
          <span className="button-arrow-icon">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      ) : (
        <Link href={href} className="button-arrow-container">
          <span className="button-arrow-text">{children}</span>
          <span className="button-arrow-icon">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}
    </Button>
  )
}
