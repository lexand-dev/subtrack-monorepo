import { LogoIcon } from "@/components/logo-icon"

export const AuthHeader = () => {
  return (
    <div className="flex items-center justify-center pb-6 gap-2">
      <LogoIcon className="size-8" />
      <p className="text-3xl font-bold">
        SubTrack
      </p>
    </div>
  )
}
