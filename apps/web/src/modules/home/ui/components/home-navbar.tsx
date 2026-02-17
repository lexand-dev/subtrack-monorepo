import Link from 'next/link'
import { LogoIcon } from '@/components/logo-icon'

import UserMenu from '@/modules/auth/ui/components/user-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'

export const HomeNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 border z-50">
      <div className='flex items-center w-full h-full px-5'>
        <SidebarTrigger className="[&>svg]:size-6!" />
        {/* Logo */}
        <Link href="/">
          <div className="flex shrink-0 items-center px-4">
            <LogoIcon className='size-7' />
            <h2 className='pl-2 font-semibold text-2xl'>
              Subtrack
            </h2>
          </div>
        </Link>

        {/* User Menu */}
        <div className='flex flex-1 justify-end'>
          <UserMenu />
        </div>
      </div>
    </div>
  )
}
