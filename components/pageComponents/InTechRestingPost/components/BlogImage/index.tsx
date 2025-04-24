interface Props {
  url: string
  alt: string
}

export default function BlogImage({ alt, url }: Props) {
  return (
    <div className="w-full">
      <picture>
        <img
          className="rounded-lg border border-border"
          src={url}
          alt={alt}
          width="100%"
        />
      </picture>
    </div>
  )
}
