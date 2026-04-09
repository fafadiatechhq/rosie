import Link from 'next/link'
import { Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DocsSidebar from '@/components/docs/DocsSidebar'

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 h-14 flex items-center justify-between shrink-0 bg-card/50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bug className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-base font-semibold text-foreground tracking-tight">
              Rosie
            </span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <span className="text-sm font-medium text-muted-foreground">
            Documentation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DocsLayout
