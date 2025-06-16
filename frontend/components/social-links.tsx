import Link from "next/link"
import { Twitter, Github, Youtube, Twitch, DiscIcon as Discord } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialLinksProps {
  className?: string
  variant?: "default" | "white"
}

export default function SocialLinks({ className, variant = "default" }: SocialLinksProps) {
  const iconClasses =
    variant === "white"
      ? "h-5 w-5 text-white hover:text-white/80"
      : "h-5 w-5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-500"

  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <Link
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="hover-scale"
      >
        <Twitter className={iconClasses} />
      </Link>
      <Link
        href="https://discord.gg"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
        className="hover-scale"
      >
        <Discord className={iconClasses} />
      </Link>
      <Link
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="hover-scale"
      >
        <Youtube className={iconClasses} />
      </Link>
      <Link
        href="https://twitch.tv"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitch"
        className="hover-scale"
      >
        <Twitch className={iconClasses} />
      </Link>
      <Link
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="hover-scale"
      >
        <Github className={iconClasses} />
      </Link>
    </div>
  )
}
