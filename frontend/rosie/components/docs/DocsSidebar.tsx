'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/utils'
import {
  BookOpen,
  Code2,
  Key,
  Layers,
  PlayCircle,
  Settings2,
  Webhook,
  FileCode2,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

interface DocSection {
  label: string
  items: { label: string; path: string; icon: React.ElementType }[]
}

const sections: DocSection[] = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Introduction', path: '/docs', icon: BookOpen },
      { label: 'Quickstart', path: '/docs/quickstart', icon: PlayCircle },
      { label: 'Authentication', path: '/docs/authentication', icon: Key },
    ],
  },
  {
    label: 'Core Concepts',
    items: [
      { label: 'Collections', path: '/docs/collections', icon: Layers },
      { label: 'Fetchers', path: '/docs/fetchers', icon: Settings2 },
      { label: 'Webhooks', path: '/docs/webhooks', icon: Webhook },
    ],
  },
  {
    label: 'API Reference',
    items: [
      { label: 'REST API', path: '/docs/api', icon: Code2 },
      { label: 'SDKs & Libraries', path: '/docs/sdks', icon: FileCode2 },
    ],
  },
  {
    label: 'Support',
    items: [{ label: 'FAQ', path: '/docs/faq', icon: HelpCircle }],
  },
]

const DocsSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card/50 overflow-y-auto h-full">
      <div className="p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.label} className="space-y-1">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
              {section.label}
            </h3>
            {section.items.map((item) => {
              const isActive =
                item.path === '/docs'
                  ? pathname === '/docs'
                  : pathname.startsWith(item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors group',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-primary" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}
export default DocsSidebar