import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-sm flex gap-sm flex-col min-h-screen items-center justify-center">
      <header className="text-xl font-semibold">
        Sign in to continue to the dashboard
      </header>
      {children}
    </div>
  );
}
