import { mockActivity } from "@/data/mock-data";
import { timeAgo } from "@/utils/timeAgo";

const typeLabels: Record<string, string> = {
  run_started: "Started",
  run_completed: "Completed",
  run_failed: "Failed",
  webhook_delivered: "Webhook",
};

export default function ActivityContainer() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Activity</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Recent events across your account
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {mockActivity.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 px-5 py-4 ${
              i !== mockActivity.length - 1 ? "border-b border-border/50" : ""
            } animate-slide-in`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                item.type === "run_completed"
                  ? "bg-success"
                  : item.type === "run_failed"
                    ? "bg-destructive"
                    : item.type === "run_started"
                      ? "bg-primary animate-pulse-glow"
                      : "bg-muted-foreground"
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{item.message}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {typeLabels[item.type]}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {timeAgo(item.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
