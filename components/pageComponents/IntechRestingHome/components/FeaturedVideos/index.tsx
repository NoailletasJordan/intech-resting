export default function FeaturedVideos() {
  return (
    <div className="border-border bg-surface-light rounded-lg border p-4 px-5 max-sm:mx-1">
      <div className="grid grid-cols-2 justify-center gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        <div className="border-border aspect-video w-full max-w-full overflow-hidden rounded-lg border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/W3IVmZ_KCzk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="border-border aspect-video w-full max-w-full overflow-hidden rounded-lg border">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/oHIpUfy98lk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
