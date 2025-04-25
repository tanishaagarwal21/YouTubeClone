"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function VideoInfo({ video }: { video: any }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [likes, setLikes] = useState(video.likes)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
      setLikes(likes - 1)
    } else {
      setIsLiked(true)
      setLikes(likes + 1)
      if (isDisliked) {
        setIsDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      setIsDisliked(true)
      if (isLiked) {
        setIsLiked(false)
        setLikes(likes - 1)
      }
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <h1 className="text-xl font-bold">{video.title}</h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
            <Image
              src={`https://avatar.vercel.sh/${video.channelId}`}
              alt={video.channelName}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{video.channelName}</div>
            <div className="text-sm text-muted-foreground">1.2M subscribers</div>
          </div>
          <Button className="ml-4" variant="secondary">
            Subscribe
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex overflow-hidden rounded-full bg-muted">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-r-none ${isLiked ? "bg-accent" : ""}`}
              onClick={handleLike}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              {likes.toLocaleString()}
            </Button>
            <Separator orientation="vertical" />
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-l-none ${isDisliked ? "bg-accent" : ""}`}
              onClick={handleDislike}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="secondary" size="sm">
            <Share className="mr-1 h-4 w-4" />
            Share
          </Button>

          <Button variant="secondary" size="sm">
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-3">
        <div className="flex items-center gap-2 text-sm">
          <span>{video.views.toLocaleString()} views</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}</span>
        </div>

        <div className={`mt-2 text-sm ${!showFullDescription && "line-clamp-2"}`}>{video.description}</div>

        {video.description && video.description.length > 100 && (
          <Button
            variant="link"
            size="sm"
            className="mt-1 h-auto p-0 text-sm"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </Button>
        )}
      </div>
    </div>
  )
}
