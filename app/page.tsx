import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import VideoGrid from "@/components/video-grid"
import FilterButtons from "@/components/filter-buttons"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 md:px-6 pb-8">
          <FilterButtons />
          <VideoGrid />
        </main>
      </div>
    </div>
  )
}
