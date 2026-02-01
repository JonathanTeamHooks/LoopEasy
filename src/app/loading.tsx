export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#6366f1] border-t-transparent animate-spin" />
        <p className="text-[#6b6b70] text-sm">Loading...</p>
      </div>
    </div>
  )
}
