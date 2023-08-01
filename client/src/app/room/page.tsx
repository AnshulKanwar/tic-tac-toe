"use client"
import { useSearchParams } from "next/navigation"
import { Copy } from "lucide-react"

export default function Room() {
  const searchParams = useSearchParams()
  // TODO: get current url using window.location.href
  const id = searchParams.get('id')

  const link = `http://localhost:3000/room?id=${id}`

  return (
    <main className="mt-36 grid place-items-center">
      <p>Share this link with your friend</p>
      <button onClick={() => navigator.clipboard.writeText(link)} className="flex gap-2 bg-zinc-900 p-3 mx-3 my-5 rounded-md border border-dashed group cursor-pointer border-zinc-600 hover:bg-zinc-800">
        {link}
        <span><Copy className="text-zinc-400 group-hover:text-white" /></span>
      </button>
      <div className="text-zinc-500">Waiting for other player...</div>
    </main>
  )
}