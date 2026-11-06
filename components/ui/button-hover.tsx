import type { AnchorHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"

type BookingButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>

export default function Btn09({
  href = "https://calendar.app.google/BcvawZuXMM3T6q2G9",
  children = "Choose a time & book →",
  ...props
}: BookingButtonProps) {
  return (
    <Button asChild className="group relative inline-flex h-auto min-h-11 items-center justify-center overflow-hidden rounded-md border-0 bg-gray-800 px-8 py-2.5 tracking-tighter text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-orange-600">
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        <span aria-hidden="true" className="pointer-events-none absolute aspect-square w-0 rounded-full bg-orange-600 transition-all duration-500 ease-out group-hover:w-[150%] group-focus-visible:w-[150%] motion-reduce:transition-none" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 -ml-2 h-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-auto" viewBox="0 0 487 487" focusable="false">
            <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" />
          </svg>
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -mr-3 h-full w-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full object-cover" viewBox="0 0 487 487" focusable="false">
            <path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" />
          </svg>
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-200 opacity-30" />
        <span className="relative text-base font-semibold">{children}</span>
      </a>
    </Button>
  )
}
