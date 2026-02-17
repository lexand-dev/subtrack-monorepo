import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      {/* Background */}
      <div className="fixed left-0 top-o -z-10 h-full w-full">
        <div className="relative h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:_14px_24px]">
          </div>
          <div className="absolute left-0 right-0 top-[-10%] h-250 w-250 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">

          </div>
        </div>
      </div>
      {/* Auth Components */}
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
