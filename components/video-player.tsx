export default function VideoPlayer({ video }: { video: any }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      {/* In a real app, this would be a real video player */}
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold">{video.title}</h2>
          <p className="mt-2">Video player would be here</p>
        </div>
      </div>
    </div>
  )
}
