"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import VideoPlayer from "@/components/video-player"
import VideoInfo from "@/components/video-info"
import CommentSection from "@/components/comment-section"
import { sampleVideos } from "@/lib/sample-data"

export default function WatchPage() {
  const params = useParams()
  const videoId = params.videoId as string
  const [video, setVideo] = useState<any>(null)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundVideo = sampleVideos.find((v) => v.videoId === videoId)
    setVideo(foundVideo)
  }, [videoId])

  if (!video) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VideoPlayer video={video} />
              <VideoInfo video={video} />
              <CommentSection video={video} />
            </div>
            <div className="hidden lg:block">{/* Recommended videos would go here */}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
