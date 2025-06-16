import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Game {
  id: number
  title: string
  description: string
  image: string
  status: string
}

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold">{game.title}</h3>
          <Badge
            variant={
              game.status === "Released" ? "default" : game.status === "In Development" ? "secondary" : "outline"
            }
            className={
              game.status === "Released"
                ? "bg-primary hover:bg-primary/90"
                : game.status === "In Development"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : ""
            }
          >
            {game.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{game.description}</p>
      </CardContent>
      <CardFooter className="border-t border-border p-6">
        <Link href={`/games/${game.id}`} className="text-sm font-medium text-primary hover:text-primary/90">
          Learn more →
        </Link>
      </CardFooter>
    </Card>
  )
}
