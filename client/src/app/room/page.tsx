"use client"
import { useSearchParams } from "next/navigation"

export default function Room() {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  return (
    <main>
      {id}
    </main>
  )
}