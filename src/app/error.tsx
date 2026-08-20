"use client"

export default function GlobalError({ error }: { error: Error }) {
  console.error(error)
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center">
        <div className="section-container text-center">
          <h1 className="font-display text-4xl text-clay">Something went wrong</h1>
          <p className="mt-4 text-clay/60">An unexpected error occurred. Please try again later.</p>
        </div>
      </body>
    </html>
  )
}
