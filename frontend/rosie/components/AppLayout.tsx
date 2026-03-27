import { AppSidebar } from '@/components/AppSidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen ">
          <AppSidebar />
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-7xl p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
