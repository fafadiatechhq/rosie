
import { useState } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Layers, Clock, Globe, Bot, Plus, Minus } from "lucide-react";

const fetcherSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  type: z.enum(
    ["seedlist", "monitor", "full_site", "discovery", "rss", "sitemap"] as const,
    // {
    //   required_error: "Select a fetcher type",
    // },
  ),
  schedule: z.enum(["once", "interval", "cron"] as const, {
    // required_error: "Select a schedule",
  }),
  depth: z.number().min(1, "Minimum depth is 1").max(10, "Maximum depth is 10"),
  seeds: z.string().trim().min(1, "At least one seed URL is required"),
  useHeadless: z.boolean(),
  rotatingProxy: z.boolean(),
  inclusionDomains: z.string().trim(),
  exclusionDomains: z.string().trim(),
});

type FetcherFormData = z.infer<typeof fetcherSchema>;

interface CreateFetcherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionName: string;
}

const fetcherTypes = [
  {
    value: "seedlist",
    label: "Seedlist",
    desc: "Crawl from a list of seed URLs",
  },
  {
    value: "monitor",
    label: "Monitor",
    desc: "Track changes on specific pages",
  },
  { value: "full_site", label: "Full Site", desc: "Crawl an entire website" },
  {
    value: "discovery",
    label: "Discovery",
    desc: "Discover new URLs automatically",
  },
  { value: "rss", label: "RSS", desc: "Parse and follow RSS feeds" },
  { value: "sitemap", label: "Sitemap", desc: "Crawl URLs from a sitemap" },
] as const;

const scheduleTypes = [
  { value: "once", label: "One-time" },
  { value: "interval", label: "Interval" },
  { value: "cron", label: "Cron" },
] as const;

export function CreateFetcherModal({
  open,
  onOpenChange,
  collectionName,
}: CreateFetcherModalProps) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FetcherFormData>({
    name: "",
    type: "seedlist",
    schedule: "once",
    depth: 3,
    seeds: "",
    useHeadless: false,
    rotatingProxy: false,
    inclusionDomains: "",
    exclusionDomains: "",
  });

  const updateField = <K extends keyof FetcherFormData>(
    key: K,
    value: FetcherFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = fetcherSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    toast({
      title: "Fetcher created",
      description: `"${form.name}" has been added to ${collectionName}.`,
    });

    // Reset form
    setForm({
      name: "",
      type: "seedlist",
      schedule: "once",
      depth: 3,
      seeds: "",
      useHeadless: false,
      rotatingProxy: false,
      inclusionDomains: "",
      exclusionDomains: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleCancel = () => {
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            Create Fetcher
          </DialogTitle>
          <DialogDescription>
            Add a new fetcher to{" "}
            <span className="font-medium text-foreground">
              {collectionName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="fetcher-name">Name</Label>
            <Input
              id="fetcher-name"
              placeholder="e.g. Product Pages Crawler"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              maxLength={100}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Type + Schedule row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fetcher Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  updateField("type", v as FetcherFormData["type"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {fetcherTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex flex-col">
                        <span>{t.label}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {t.desc}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-xs text-destructive">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Schedule</Label>
              <Select
                value={form.schedule}
                onValueChange={(v) =>
                  updateField("schedule", v as FetcherFormData["schedule"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  {scheduleTypes.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.schedule && (
                <p className="text-xs text-destructive">{errors.schedule}</p>
              )}
            </div>
          </div>

          {/* Depth */}
          <div className="space-y-2">
            <Label>Crawl Depth</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() =>
                  updateField("depth", Math.max(1, form.depth - 1))
                }
                disabled={form.depth <= 1}
              >
                <Minus />
              </Button>
              <span className="text-sm font-mono text-foreground w-8 text-center">
                {form.depth}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() =>
                  updateField("depth", Math.min(10, form.depth + 1))
                }
                disabled={form.depth >= 10}
              >
                <Plus />
              </Button>
              <span className="text-xs text-muted-foreground ml-2">
                Max link depth to follow (1–10)
              </span>
            </div>
            {errors.depth && (
              <p className="text-xs text-destructive">{errors.depth}</p>
            )}
          </div>

          {/* Seed URLs */}
          <div className="space-y-2">
            <Label htmlFor="seeds">Seed URLs</Label>
            <Textarea
              id="seeds"
              placeholder={"https://example.com\nhttps://example.com/products"}
              value={form.seeds}
              onChange={(e) => updateField("seeds", e.target.value)}
              rows={3}
              className="font-mono text-xs resize-none"
            />
            <p className="text-[10px] text-muted-foreground">
              Enter one URL per line
            </p>
            {errors.seeds && (
              <p className="text-xs text-destructive">{errors.seeds}</p>
            )}
          </div>

          {/* Domains */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inclusion-domains">Inclusion Domains</Label>
              <Input
                id="inclusion-domains"
                placeholder="example.com, shop.example.com"
                value={form.inclusionDomains}
                onChange={(e) =>
                  updateField("inclusionDomains", e.target.value)
                }
              />
              <p className="text-[10px] text-muted-foreground">
                Comma-separated, leave empty for all
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exclusion-domains">Exclusion Domains</Label>
              <Input
                id="exclusion-domains"
                placeholder="ads.example.com"
                value={form.exclusionDomains}
                onChange={(e) =>
                  updateField("exclusionDomains", e.target.value)
                }
              />
              <p className="text-[10px] text-muted-foreground">
                Comma-separated domains to skip
              </p>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Headless Browser
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Use Puppeteer for JS-rendered pages
                  </p>
                </div>
              </div>
              <Switch
                checked={form.useHeadless}
                onCheckedChange={(v) => updateField("useHeadless", v)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Rotating Proxy
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Route through proxy pool (billable)
                  </p>
                </div>
              </div>
              <Switch
                checked={form.rotatingProxy}
                onCheckedChange={(v) => updateField("rotatingProxy", v)}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus />
              Create Fetcher
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
