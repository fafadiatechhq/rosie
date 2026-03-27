"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Building2,
  HeartPulse,
  ScrollText,
  AlertTriangle,
  CreditCard,
  Network,
  Flag,
  Archive,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react'
import { cn } from '@/utils/utils'
import { useState } from 'react'

const navItems = [
  { title: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Accounts', path: '/admin/accounts', icon: Building2 },
  { title: 'System Health', path: '/admin/system-health', icon: HeartPulse },
  { title: 'Global Logs', path: '/admin/logs', icon: ScrollText },
  { title: 'Failed Fetchers', path: '/admin/failures', icon: AlertTriangle },
  { title: 'Plans & Quotas', path: '/admin/plans', icon: CreditCard },
  { title: 'Proxy Pools', path: '/admin/proxies', icon: Network },
  { title: 'Feature Flags', path: '/admin/features', icon: Flag },
  { title: 'Retention', path: '/admin/retention', icon: Archive },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 ease-out',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-destructive/80 flex items-center justify-center">
            <Shield className="w-4 h-4 text-destructive-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sidebar-accent-foreground font-semibold text-lg tracking-tight">
              Admin
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== '/admin/dashboard' &&
              pathname.startsWith(item.path))

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  isActive && 'text-sidebar-primary',
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Back to app link */}
      {!collapsed && (
        <div className="mx-3 mb-3">
          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to App
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  )
}
