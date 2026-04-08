"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { PenLine, BarChart3, FileText, ChevronRight } from "lucide-react";

const sidebarItems = [
  { label: "Blog", path: "/resources/blog", icon: PenLine },
  { label: "Case Studies", path: "/resources/case-studies", icon: BarChart3 },
  { label: "White Papers", path: "/resources/white-papers", icon: FileText },
];

export function ResourcesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card/50 overflow-y-auto h-full">
      <div className="p-4 space-y-1">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-3">
          Resources
        </h3>

        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors group",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
