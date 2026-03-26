import { cn } from "@/utils/utils";

interface StatusBadgeProps {
  status:
    | "running"
    | "idle"
    | "failed"
    | "success"
    | "failure"
    | "active"
    | "paused";
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; dotClass: string; bgClass: string }
> = {
  running: {
    label: "Running",
    dotClass: "bg-success animate-pulse-glow",
    bgClass: "bg-success/10 text-success",
  },
  idle: {
    label: "Idle",
    dotClass: "bg-muted-foreground",
    bgClass: "bg-muted text-muted-foreground",
  },
  success: {
    label: "Success",
    dotClass: "bg-success",
    bgClass: "bg-success/10 text-success",
  },
  failed: {
    label: "Failed",
    dotClass: "bg-destructive",
    bgClass: "bg-destructive/10 text-destructive",
  },
  failure: {
    label: "Failed",
    dotClass: "bg-destructive",
    bgClass: "bg-destructive/10 text-destructive",
  },
  active: {
    label: "Active",
    dotClass: "bg-success",
    bgClass: "bg-success/10 text-success",
  },
  paused: {
    label: "Paused",
    dotClass: "bg-warning",
    bgClass: "bg-warning/10 text-warning",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.idle;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
        config.bgClass,
        className,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)} />
      {config.label}
    </span>
  );
}
