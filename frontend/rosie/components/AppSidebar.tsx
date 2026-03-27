"use client"
import Link from 'next/link'
import {
  LayoutDashboard,
  FolderOpen,
  Activity,
  BarChart3,
  Settings,
  Bug,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { cn } from '@/utils/utils'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
const navItems = [
  { title: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { title: 'Collections', path: '/app/collections', icon: FolderOpen },
  { title: 'Activity', path: '/app/activity', icon: Activity },
  { title: 'Usage', path: '/app/usage', icon: BarChart3 },
  { title: 'Logs', path: '/app/logs', icon: Bug },
  { title: 'Settings', path: '/app/settings', icon: Settings },
]

export function AppSidebar() {
const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-50 flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 ease-out',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-14 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sidebar-accent-foreground font-semibold text-lg tracking-tight">
              Rosie
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== '/app/dashboard' &&
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

      {/* Plan badge */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-lg bg-sidebar-accent border border-sidebar-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-sidebar-accent-foreground">
              Pro Plan
            </span>
            <span className="text-[10px] font-mono text-sidebar-primary">
              32%
            </span>
          </div>
          <div className="w-full h-1 rounded-full bg-sidebar-border">
            <div
              className="h-1 rounded-full bg-primary"
              style={{ width: '32%' }}
            />
          </div>
          <p className="text-[10px] text-sidebar-foreground mt-1.5">
            1.6M / 5M pages
          </p>
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

