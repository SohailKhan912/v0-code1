"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: number
  author: string
  rating: number
  date: string
  comment: string
  helpful: number
}

export function ProductReviews() {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      author: "Raj Kumar",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent quality glass door! The installation was smooth and the finish is perfect. Highly recommend GlassVision.",
      helpful: 12,
    },
    {
      id: 2,
      author: "Priya Singh",
      rating: 4,
      date: "1 month ago",
      comment:
        "Beautiful design and sturdy construction. The only minor issue was delivery took a bit longer than expected, but the product quality makes up for it.",
      helpful: 8,
    },
    {
      id: 3,
      author: "Amit Patel",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best investment for our home! The frameless design looks absolutely stunning. Customer service was also very helpful throughout the process.",
      helpful: 15,
    },
  ])

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6 pb-6 border-b">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
            </div>

            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((r) => r.rating === rating).length
                const percentage = (count / reviews.length) * 100
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-12">{rating} star</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                    <Button variant="ghost" size="sm" className="gap-2 h-8">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">Your Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="hover:scale-110 transition">
                      <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea placeholder="Share your experience with this product..." rows={4} />
              <Button className="bg-primary hover:bg-primary/90">Submit Review</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
