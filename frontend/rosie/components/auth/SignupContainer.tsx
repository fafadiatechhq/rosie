"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/utils/utils";

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(100, "Max 100 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be under 72 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains uppercase", test: (p: string) => /[A-Z]/.test(p) },
];

const SignupContainer = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate signup delay (replace with real auth later)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    toast({
      title: "Account created!",
      description: "Let's set up your first collection.",
    });
    router.push("/onboarding");
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start crawling in minutes — no credit card required
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
            autoComplete="name"
            maxLength={100}
            autoFocus
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError("password");
              }}
              autoComplete="new-password"
              className="pr-10"
              maxLength={72}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password}</p>
          )}

          {/* Password strength indicators */}
          {password.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {passwordRequirements.map((req, i) => {
                const met = req.test(password);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors",
                        met ? "bg-success text-success-foreground" : "bg-muted",
                      )}
                    >
                      {met && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span
                      className={cn(
                        "text-[11px]",
                        met ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearError("confirmPassword");
            }}
            autoComplete="new-password"
            maxLength={72}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        <p className="text-[11px] text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">
            Already have an account?
          </span>
        </div>
      </div>

      {/* Sign in link */}
      <div className="text-center">
        <Link href="/login">
          <Button variant="outline" className="w-full">
            Sign in instead
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignupContainer;