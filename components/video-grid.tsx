"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { sampleVideos } from "@/lib/sample-data"

export default function VideoGrid() {
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    setVideos(sampleVideos)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link key={video.videoId} href={`/watch/${video.videoId}`}>
          <div className="group cursor-pointer">
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={video.thumbnail || `/placeholder.svg?height=200&width=360&text=${encodeURIComponent(video.title)}`}
                alt={video.title}
                width={360}
                height={200}
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex gap-3 pt-3">
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                <Image
                  src={`https://avatar.vercel.sh/${video.channelId}`}
                  alt={video.channelName}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="line-clamp-2 font-medium leading-tight">{video.title}</h3>
                <div className="text-sm text-muted-foreground">
                  <div>{video.channelName}</div>
                  <div>
                    {video.views.toLocaleString()} views •{" "}
                    {formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
