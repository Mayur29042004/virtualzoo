"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4 text-balance">Virtual Zoo</h1>
        <p className="text-xl text-emerald-700 mb-8 text-pretty">
          Explore the world's most fascinating animals through immersive 3D holograms and interactive learning
        </p>
        <Link href="/habitats">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
            Explore Habitats
          </Button>
        </Link>
      </div>
    </main>
  )
}
