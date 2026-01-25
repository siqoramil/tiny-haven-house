import { Home } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Home className="w-8 h-8 text-primary-600" />
          </div>
          {/* Spinning Ring */}
          <div className="absolute inset-0 -m-2">
            <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="mt-8 text-neutral-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
