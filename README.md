# Intech' Resting

A platform to share web-related things while teaching a thing or two.

### Features

- **CMS Integration:** Simplified content management, linked to a frontend
  framework.
- **Internationalization:** Post available in both French and English.
- **SEO-Ready:** Dynamic metadatas, aligned with the language.

### Snapshot

![Image](https://github.com/user-attachments/assets/d615a70f-ebdf-4925-87af-73ed92cf9c99)

## Behind the scene

### SEO and Rendering Method

This project uses a hybrid approach to rendering, with two types of pages:

- **Homepage**: Lists available posts.
- **Post Pages**: Show full post content.

The rendering methods used are:

1. **Static Generation**: Prebuilt pages at build time.
2. **Server-Side Rendering (SSR)**: Pages built on client request.
3. **Client-Side Rendering (CSR)**: Pages built on the client-side.

For SEO and localization, a solution was devised:

- **Localized Pages**: Each locale has a statically generated page at build time
  (e.g., `/fr/<postID>`).
- **Generic URL**: A server-side rendered page handles locale redirects (e.g.,
  `/postID`).

This ensures SEO-friendly, locale-specific pages, avoids CMS fetching on
request, and keeps content available even with CMS issues.

### Context of the making

The way we consume blog posts and articles has shifted in recent years. What was
once use to share resources and tutorials, got devanced by AI chatbot, that
deliver such informations instantly.

It is however incorrect to assume blogs became irrelevant. I came across
incredible value in recent posts by [Emil Kowalski](https://emilkowal.ski/),
[Nanda Syahrasyad](https://www.nan.fyi/) or
[Josh W. Comeau](https://www.joshwcomeau.com/), wich all share common
denominators.

They all evolved to deliver:

1. Deep techincal knowledge.
2. Openly opinionated viewpoints (based on experiences).
3. Top-tier visuals and exemples.

Essentially, the opposite of AI, that is about highlighting tradeoffs on surface
level subjects. It’s with those new principles in mind that I gave my old blog a
much-needed revamp.
