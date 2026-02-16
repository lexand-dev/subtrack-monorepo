export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main>
      <div className="fixed left-0 top-o -z-10 h-full w-full">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:_14px_24px]">
          </div>
          <div className="absolute left-0 right-0 top-[-10%] h-250 w-250 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">

          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto h-screen w-full max-w-7xl px-6 md:px8 lg:px-12">
        {children}
      </div>
    </main>
  )
}
