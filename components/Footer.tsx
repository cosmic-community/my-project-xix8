export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {year} Digital Business Card. All rights reserved.</p>
      </div>
    </footer>
  )
}