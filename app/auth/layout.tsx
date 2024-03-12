export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" max-w-md w-full  mx-auto">{children}</div>;
}
