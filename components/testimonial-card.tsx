import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react"

interface TestimonialCardProps {
  content: string
  author: string
  role: string
  avatar: string
}

export function TestimonialCard({ content, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-6 relative">
        <QuoteIcon className="h-8 w-8 text-primary/40 mb-4" />
        <p className="mb-6 text-muted-foreground">{content}</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
