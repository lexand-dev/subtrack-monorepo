export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-full">
      {children}
    </main>
  );
}
