import Header from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsla(127,55%,62%,0.3),rgba(255,255,255,0))]
"></div>
      <Header />
      {children}
    </main>
  )
}
