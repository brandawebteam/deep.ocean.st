import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ButtonWithArrowProps {
  href: string
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  external?: boolean
}

export default function ButtonWithArrow({
  href,
  children,
  variant = "default",
  size = "default",
  className,
  external = false,
}: ButtonWithArrowProps) {
  const buttonContent = (
    <div className="flex items-center justify-center">
      <span className="inline-block">{children}</span>
      <span className="inline-flex ml-2 relative">
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  )

  return (
    <Button variant={variant} size={size} className={cn("group", className)} asChild>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      ) : (
        <Link href={href}>{buttonContent}</Link>
      )}
    </Button>
  )
}
