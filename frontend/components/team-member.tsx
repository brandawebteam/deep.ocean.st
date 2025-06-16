import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMemberProps {
  member: {
    name: string
    role: string
    image: string
  }
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover grayscale transition-all duration-300 hover:grayscale-0"
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </CardContent>
    </Card>
  )
}
