import Link from "next/link";
import { Bug } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal header */}
      <header className="px-6 py-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bug className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            Rosie
          </span>
        </Link>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Rosie. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
